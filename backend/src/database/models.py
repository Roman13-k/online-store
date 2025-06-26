from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase): ...


class BuyerModel(Base):
    __tablename__ = "buyers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(nullable=False, index=True)
    password: Mapped[str] = mapped_column(nullable=False)


class SellerModel(Base):
    __tablename__ = "sellers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(nullable=False, index=True)
    password: Mapped[str] = mapped_column(nullable=False)

    type_organization: Mapped[str] = mapped_column(nullable=False)  # Тип организации
    country: Mapped[str] = mapped_column(nullable=False)  # Страна

    itn: Mapped[int] = mapped_column(nullable=False)  # ИНН
    name: Mapped[str] = mapped_column(nullable=False)  # Имя
    last_name: Mapped[str] = mapped_column(nullable=False)  # Фамилия
    patronymic: Mapped[str] = mapped_column(nullable=False)  # Отчество
    company_name: Mapped[str] = mapped_column(nullable=False)  # Название компании


class BookModel(Base):
    __tablename__ = "books"

    book_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    image_url: Mapped[str] = mapped_column(nullable=True)  # Ссылка на фотографию
    title: Mapped[str] = mapped_column(nullable=True)  # Название
    description: Mapped[str] = mapped_column(nullable=False)  # Описание
    type_book: Mapped[str] = mapped_column(nullable=False)  # Тип книги
    price: Mapped[float] = mapped_column(nullable=False)  # Цена
    author: Mapped[str] = mapped_column(nullable=False)  # Автор книги
    age_reader: Mapped[int] = mapped_column(nullable=False)  # Возраст читателя
    language: Mapped[str] = mapped_column(nullable=False)  # Язык
    type_cover: Mapped[str] = mapped_column(nullable=False)  # Тип обложки
    publishing: Mapped[str] = mapped_column(nullable=False)  # Издательство
    isbn: Mapped[int]  # Международный стандартный книжный номер
    series: Mapped[str] = mapped_column(nullable=False)  # Серия
