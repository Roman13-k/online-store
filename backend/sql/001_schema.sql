-- Физическая схема базы данных магазина книг (PostgreSQL 15+)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE roles (
    role_id SMALLINT PRIMARY KEY,
    name    VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE users (
    user_id            SERIAL PRIMARY KEY,
    role_id            SMALLINT     NOT NULL REFERENCES roles (role_id) ON DELETE RESTRICT,
    email              VARCHAR(254) NOT NULL CHECK (position('@' IN email) > 1),
    password_hash      VARCHAR(255) NOT NULL,
    last_name          VARCHAR(100) NOT NULL CHECK (btrim(last_name) <> ''),
    first_name         VARCHAR(100) NOT NULL CHECK (btrim(first_name) <> ''),
    phone              VARCHAR(20),
    lang               CHAR(2)      NOT NULL DEFAULT 'ru' CHECK (lang IN ('ru', 'be', 'en')),
    registered_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    is_active          BOOLEAN      NOT NULL DEFAULT TRUE,
    email_confirmed    BOOLEAN      NOT NULL DEFAULT FALSE,
    confirm_token_hash CHAR(64),
    confirm_expires    TIMESTAMPTZ
);
CREATE UNIQUE INDEX ux_users_email ON users (lower(email));

CREATE TABLE publishers (
    publisher_id SERIAL PRIMARY KEY,
    name         VARCHAR(200) NOT NULL UNIQUE CHECK (btrim(name) <> ''),
    country      VARCHAR(100)
);

CREATE TABLE authors (
    author_id  SERIAL PRIMARY KEY,
    last_name  VARCHAR(100) NOT NULL CHECK (btrim(last_name) <> ''),
    first_name VARCHAR(100) NOT NULL DEFAULT '',
    UNIQUE (last_name, first_name)
);

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name     VARCHAR(100) NOT NULL UNIQUE CHECK (btrim(name) <> '')
);

CREATE TABLE currencies (
    currency_code CHAR(3)       PRIMARY KEY CHECK (currency_code ~ '^[A-Z]{3}$'),
    name          VARCHAR(50)   NOT NULL,
    rate_to_byn   NUMERIC(12,6) NOT NULL CHECK (rate_to_byn > 0),
    rate_date     DATE          NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE books (
    book_id       SERIAL PRIMARY KEY,
    isbn          VARCHAR(13)   NOT NULL UNIQUE CHECK (isbn ~ '^[0-9]{10}([0-9]{3})?$'),
    title         VARCHAR(255)  NOT NULL CHECK (btrim(title) <> ''),
    publisher_id  INT           NOT NULL REFERENCES publishers (publisher_id) ON DELETE RESTRICT,
    publish_year  SMALLINT      CHECK (publish_year BETWEEN 1450 AND 2100),
    pages         SMALLINT      CHECK (pages > 0),
    price         NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    currency_code CHAR(3)       NOT NULL DEFAULT 'BYN' REFERENCES currencies (currency_code) ON DELETE RESTRICT,
    stock         INT           NOT NULL DEFAULT 0 CHECK (stock >= 0),
    annotation    VARCHAR(4000),
    cover_url     VARCHAR(500),
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);
CREATE INDEX ix_books_title_trgm ON books USING gin (title gin_trgm_ops);
CREATE INDEX ix_books_publisher ON books (publisher_id);
CREATE INDEX ix_books_price ON books (price);

CREATE TABLE book_authors (
    book_id   INT NOT NULL REFERENCES books (book_id) ON DELETE CASCADE,
    author_id INT NOT NULL REFERENCES authors (author_id) ON DELETE RESTRICT,
    PRIMARY KEY (book_id, author_id)
);
CREATE INDEX ix_book_authors_author ON book_authors (author_id);
CREATE INDEX ix_authors_last_name_trgm ON authors USING gin (last_name gin_trgm_ops);

CREATE TABLE book_genres (
    book_id  INT NOT NULL REFERENCES books (book_id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES genres (genre_id) ON DELETE RESTRICT,
    PRIMARY KEY (book_id, genre_id)
);
CREATE INDEX ix_book_genres_genre ON book_genres (genre_id);

CREATE TABLE discounts (
    discount_id SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL CHECK (btrim(name) <> ''),
    percent     NUMERIC(5,2) NOT NULL CHECK (percent > 0 AND percent <= 100),
    starts_on   DATE         NOT NULL,
    ends_on     DATE         NOT NULL,
    min_sum     NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (min_sum >= 0),
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    CHECK (ends_on >= starts_on)
);

CREATE TABLE carts (
    cart_id    SERIAL PRIMARY KEY,
    user_id    INT         NOT NULL UNIQUE REFERENCES users (user_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cart_items (
    cart_id  INT NOT NULL REFERENCES carts (cart_id) ON DELETE CASCADE,
    book_id  INT NOT NULL REFERENCES books (book_id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (cart_id, book_id)
);

CREATE TABLE orders (
    order_id      SERIAL PRIMARY KEY,
    user_id       INT           NOT NULL REFERENCES users (user_id) ON DELETE RESTRICT,
    discount_id   INT           REFERENCES discounts (discount_id) ON DELETE RESTRICT,
    currency_code CHAR(3)       NOT NULL REFERENCES currencies (currency_code) ON DELETE RESTRICT,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    status        VARCHAR(10)   NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'paid', 'packed', 'issued', 'cancelled')),
    subtotal      NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
    discount_sum  NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount_sum >= 0),
    total         NUMERIC(12,2) NOT NULL CHECK (total >= 0),
    rate_at_order NUMERIC(12,6) NOT NULL CHECK (rate_at_order > 0),
    CHECK (discount_sum <= subtotal)
);
CREATE INDEX ix_orders_user_date ON orders (user_id, created_at DESC);
CREATE INDEX ix_orders_date ON orders (created_at);

CREATE TABLE order_items (
    order_id INT           NOT NULL REFERENCES orders (order_id) ON DELETE CASCADE,
    book_id  INT           NOT NULL REFERENCES books (book_id) ON DELETE RESTRICT,
    quantity INT           NOT NULL CHECK (quantity > 0),
    price    NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    PRIMARY KEY (order_id, book_id)
);
CREATE INDEX ix_order_items_book ON order_items (book_id);

CREATE TABLE reviews (
    review_id  SERIAL PRIMARY KEY,
    user_id    INT           NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    book_id    INT           NOT NULL REFERENCES books (book_id) ON DELETE CASCADE,
    rating     SMALLINT      NOT NULL CHECK (rating BETWEEN 1 AND 5),
    body       VARCHAR(2000) NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE (user_id, book_id)
);
CREATE INDEX ix_reviews_book ON reviews (book_id);

CREATE TABLE ui_strings (
    key  VARCHAR(100)  NOT NULL,
    lang CHAR(2)       NOT NULL CHECK (lang IN ('ru', 'be', 'en')),
    text VARCHAR(2000) NOT NULL,
    PRIMARY KEY (key, lang)
);

-- Корзина создаётся вместе с покупателем
CREATE FUNCTION trg_user_cart() RETURNS trigger AS $$
BEGIN
    IF NEW.role_id = 1 THEN
        INSERT INTO carts (user_id) VALUES (NEW.user_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_create_cart
AFTER INSERT ON users
FOR EACH ROW EXECUTE FUNCTION trg_user_cart();

-- Карточка книги для каталога: авторы, жанры, средняя оценка
CREATE VIEW v_book_cards AS
SELECT b.book_id, b.isbn, b.title, b.publish_year, b.pages, b.price, b.currency_code,
       b.stock, b.cover_url, b.annotation, b.created_at, b.publisher_id, p.name AS publisher,
       round(b.price * c.rate_to_byn, 2) AS price_byn,
       COALESCE((SELECT string_agg(trim(a.first_name || ' ' || a.last_name), ', ' ORDER BY a.last_name)
                 FROM book_authors ba JOIN authors a ON a.author_id = ba.author_id
                 WHERE ba.book_id = b.book_id), '') AS authors,
       COALESCE((SELECT string_agg(g.name, ', ' ORDER BY g.name)
                 FROM book_genres bg JOIN genres g ON g.genre_id = bg.genre_id
                 WHERE bg.book_id = b.book_id), '') AS genres,
       (SELECT round(avg(r.rating), 1) FROM reviews r WHERE r.book_id = b.book_id) AS rating,
       (SELECT count(*) FROM reviews r WHERE r.book_id = b.book_id) AS reviews_count
FROM books b
JOIN publishers p ON p.publisher_id = b.publisher_id
JOIN currencies c ON c.currency_code = b.currency_code;

-- Оформление заказа одной транзакцией: проверка остатков, скидка, пересчёт валюты
CREATE FUNCTION place_order(p_user_id INT, p_currency CHAR(3)) RETURNS INT AS $$
DECLARE
    v_cart_id   INT;
    v_subtotal  NUMERIC(12,2);
    v_discount  discounts%ROWTYPE;
    v_disc_sum  NUMERIC(12,2) := 0;
    v_rate      NUMERIC(12,6);
    v_order_id  INT;
    v_short     TEXT;
BEGIN
    SELECT cart_id INTO v_cart_id FROM carts WHERE user_id = p_user_id;
    IF v_cart_id IS NULL OR NOT EXISTS (SELECT 1 FROM cart_items WHERE cart_id = v_cart_id) THEN
        RAISE EXCEPTION 'CART_EMPTY';
    END IF;

    SELECT rate_to_byn INTO v_rate FROM currencies WHERE currency_code = p_currency;
    IF v_rate IS NULL THEN
        RAISE EXCEPTION 'CURRENCY_UNKNOWN';
    END IF;

    -- блокируем строки книг, чтобы параллельный заказ не продал те же экземпляры
    PERFORM 1 FROM books b JOIN cart_items ci ON ci.book_id = b.book_id
     WHERE ci.cart_id = v_cart_id FOR UPDATE OF b;

    SELECT string_agg(b.title, '; ') INTO v_short
      FROM cart_items ci JOIN books b ON b.book_id = ci.book_id
     WHERE ci.cart_id = v_cart_id AND b.stock < ci.quantity;
    IF v_short IS NOT NULL THEN
        RAISE EXCEPTION 'OUT_OF_STOCK: %', v_short;
    END IF;

    SELECT round(sum(b.price * c.rate_to_byn * ci.quantity), 2) INTO v_subtotal
      FROM cart_items ci
      JOIN books b ON b.book_id = ci.book_id
      JOIN currencies c ON c.currency_code = b.currency_code
     WHERE ci.cart_id = v_cart_id;

    SELECT * INTO v_discount FROM discounts
     WHERE is_active AND CURRENT_DATE BETWEEN starts_on AND ends_on AND min_sum <= v_subtotal
     ORDER BY percent DESC LIMIT 1;
    IF FOUND THEN
        v_disc_sum := round(v_subtotal * v_discount.percent / 100, 2);
    END IF;

    INSERT INTO orders (user_id, discount_id, currency_code, subtotal, discount_sum, total, rate_at_order)
    VALUES (p_user_id, v_discount.discount_id, p_currency, v_subtotal, v_disc_sum,
            round((v_subtotal - v_disc_sum) / v_rate, 2), v_rate)
    RETURNING order_id INTO v_order_id;

    INSERT INTO order_items (order_id, book_id, quantity, price)
    SELECT v_order_id, ci.book_id, ci.quantity, round(b.price * c.rate_to_byn, 2)
      FROM cart_items ci
      JOIN books b ON b.book_id = ci.book_id
      JOIN currencies c ON c.currency_code = b.currency_code
     WHERE ci.cart_id = v_cart_id;

    UPDATE books b SET stock = b.stock - ci.quantity
      FROM cart_items ci
     WHERE ci.cart_id = v_cart_id AND ci.book_id = b.book_id;

    DELETE FROM cart_items WHERE cart_id = v_cart_id;
    RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

-- Отмена заказа до выдачи возвращает экземпляры на склад
CREATE FUNCTION cancel_order(p_order_id INT) RETURNS VOID AS $$
DECLARE
    v_status VARCHAR(10);
BEGIN
    SELECT status INTO v_status FROM orders WHERE order_id = p_order_id FOR UPDATE;
    IF v_status IS NULL THEN
        RAISE EXCEPTION 'ORDER_NOT_FOUND';
    END IF;
    IF v_status IN ('issued', 'cancelled') THEN
        RAISE EXCEPTION 'ORDER_NOT_CANCELLABLE';
    END IF;
    UPDATE books b SET stock = b.stock + oi.quantity
      FROM order_items oi
     WHERE oi.order_id = p_order_id AND oi.book_id = b.book_id;
    UPDATE orders SET status = 'cancelled' WHERE order_id = p_order_id;
END;
$$ LANGUAGE plpgsql;
