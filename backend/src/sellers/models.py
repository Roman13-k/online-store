from sqlalchemy.orm import Mapped, mapped_column, relationship

# from src.books.models import BookModel
from src.database import Base


class SellerModel(Base):
    __tablename__ = "sellers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(index=True)
    password: Mapped[str]

    type_organization: Mapped[str]
    country: Mapped[str]

    itn: Mapped[int]
    name: Mapped[str]
    last_name: Mapped[str]
    patronymic: Mapped[str]
    company_name: Mapped[str]

    refresh_token: Mapped[str] = mapped_column(nullable=True)

    is_active: Mapped[bool] = mapped_column(default=True)

    books: Mapped[list["BookModel"]] = relationship(  # noqa: F821 # type: ignore
        "BookModel", back_populates="seller"
    )
