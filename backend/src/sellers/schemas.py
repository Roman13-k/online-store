from pydantic import BaseModel, EmailStr, Field


class SellerCreateSchema(BaseModel):
    email: EmailStr = Field(max_length=40)
    password: str = Field(max_length=20)
    type_organization: str
    country: str
    itn: int
    name: str
    last_name: str
    patronymic: str
    company_name: str
