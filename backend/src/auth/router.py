from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_session

from .schemas import LoginSchema
from .service import authenticate_user

router = APIRouter(prefix="/auth", tags=["Auth 🔐"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")


@router.post("/login/")
async def login_user(data: LoginSchema, db: AsyncSession = Depends(get_session)):
    return await authenticate_user(data=data, db=db)
