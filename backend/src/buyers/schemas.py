from pydantic import BaseModel, EmailStr


class BuyerCreateSchema(BaseModel):
    email: EmailStr
    password: str


class BuyerResponseSchema(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
