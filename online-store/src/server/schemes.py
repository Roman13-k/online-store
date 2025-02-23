from pydantic import BaseModel, EmailStr, Field


class BuyerAddSchema(BaseModel):  # Добавление покупателя
    email: EmailStr = Field(max_length=40)
    password: str = Field(max_length=20)


class SellerAddSchema(BaseModel):  # Добавление продавца
    email: EmailStr = Field(max_length=40)
    password: str = Field(max_length=20)

    type_organization: str
    country: str

    itn: str
    name: str
    last_name: str
    patronymic: str
    company_name: str


class LoginSchema(BaseModel):  # Логин пользователя
    email: EmailStr
    password: str


class BookAddSchema(BaseModel):  # Создание книги
    title: str
    description: str
    type_book: str
    price: float
    author: str
    age_reader: int
    language: str
    type_cover: str
    publishing: str
    isbn: int
    series: str
