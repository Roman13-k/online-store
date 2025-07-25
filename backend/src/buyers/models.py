from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class BuyerModel(Base):
    __tablename__ = "buyers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(nullable=False, index=True)
    password: Mapped[str] = mapped_column(nullable=False)
    refresh_token: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=True)
