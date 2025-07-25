from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from .schemas import LoginSchema

router = APIRouter(prefix="/auth", tags=["Auth 🔐"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")


@router.post("/login/")
async def login_user(data: LoginSchema):
    if data.user_type == "buyer":
        ...
    elif data.user_type == "seller":
        ...
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user type"
        )
