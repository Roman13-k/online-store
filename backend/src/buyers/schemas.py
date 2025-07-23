from pydantic import BaseModel, EmailStr


class BuyerCreateSchema(BaseModel):
    email: EmailStr
    password: str
