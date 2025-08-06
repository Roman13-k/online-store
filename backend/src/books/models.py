from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base

# from src.sellers.models import SellerModel


class BookModel(Base):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    characteristics: Mapped[str]
    year: Mapped[int]
    category: Mapped[str] = mapped_column(index=True)
    type_book: Mapped[str]
    author: Mapped[str]
    price: Mapped[int]
    type_cover: Mapped[str]
    publishing: Mapped[str]
    isbn: Mapped[str]
    series: Mapped[str]

    seller_id: Mapped[int] = mapped_column(ForeignKey("sellers.id"), nullable=False)

    seller: Mapped["SellerModel"] = relationship("SellerModel", back_populates="books")  # type: ignore  # noqa: F821
