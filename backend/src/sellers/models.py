from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


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

    refresh_token: Mapped[str] = mapped_column(nullable=True)

    is_active: Mapped[bool] = mapped_column(default=True)
