from pydantic import BaseModel, EmailStr, Field


class BuyerAddSchema(BaseModel):  # Покупатель
    email: EmailStr = Field(max_length=40)
    password: str = Field(max_length=20)


class SellerAddSchema(BaseModel):  # Продавец
    email: EmailStr = Field(max_length=40)
    password: str = Field(max_length=20)

    type_organization: str
    country: str

    itn: str
    name: str
    last_name: str
    patronymic: str
    company_name: str


class LoginSchema(BaseModel):
    email: EmailStr
    password: str