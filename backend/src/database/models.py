from typing import List
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


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

    type_organization: Mapped[str] = mapped_column(nullable=False)
    country: Mapped[str] = mapped_column(nullable=False)

    itn: Mapped[int] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)
    patronymic: Mapped[str] = mapped_column(nullable=False)
    company_name: Mapped[str] = mapped_column(nullable=False)


class BookModel(Base):
    __tablename__ = "books"

    book_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(nullable=False)
    type_book: Mapped[str] = mapped_column(nullable=False)
    price: Mapped[float] = mapped_column(nullable=False)
    author: Mapped[str] = mapped_column(nullable=False)
    age_reader: Mapped[int] = mapped_column(nullable=False)
    language: Mapped[str] = mapped_column(nullable=False)
    type_cover: Mapped[str] = mapped_column(nullable=False)
    publishing: Mapped[str] = mapped_column(nullable=False)
    isbn: Mapped[int]
    series: Mapped[str] = mapped_column(nullable=False)

    images: Mapped[List["BookImageModel"]] = relationship(back_populates="book", cascade="all, delete-orphan")


class BookImageModel(Base):
    __tablename__ = "book_images"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("books.book_id"))
    filename: Mapped[str] = mapped_column(nullable=False)
    is_main: Mapped[bool] = mapped_column(default=False)

    book: Mapped["BookModel"] = relationship(back_populates="images")