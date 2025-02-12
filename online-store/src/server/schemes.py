from pydantic import BaseModel, EmailStr


class BuyerSchema(BaseModel):  # Покупатель
    email: EmailStr
    password: str


class SellerSchema(BaseModel):  # Продавец
    email: EmailStr
    password: str

    type_organization: str
    country: str

    itn: str
    name: str
    last_name: str
    patronymic: str
    company_name: str
