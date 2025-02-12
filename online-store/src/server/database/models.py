from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase): ...


# Покупатель
class BuyerModel(Base):
    __tablename__ = "buyers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)


# Продавец
class SellerModel(Base):
    __tablename__ = "sellers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

    type_organization: Mapped[str] = mapped_column(nullable=False)  # Тип организации
    country: Mapped[str] = mapped_column(nullable=False)  # Страна

    itn: Mapped[int] = mapped_column(nullable=False)  # ИНН
    name: Mapped[str] = mapped_column(nullable=False)  # Имя
    last_name: Mapped[str] = mapped_column(nullable=False)  # Фамилия
    patronymic: Mapped[str] = mapped_column(nullable=False)  # Отчество
    company_name: Mapped[str] = mapped_column(nullable=False)  # Название компании
