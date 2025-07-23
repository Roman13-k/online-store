from typing import Literal

from pydantic import BaseModel, EmailStr


class LoginSchema(BaseModel):
    email: EmailStr
    password: str
    user_type: Literal["buyer", "seller"]
