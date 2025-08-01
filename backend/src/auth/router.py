from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_session

from .schemas import LoginSchema
from .service import authenticate_user, refresh_access_token_check

router = APIRouter(prefix="/auth", tags=["Auth 🔐"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login/")


@router.post("/login/")
async def login_user(
    data: LoginSchema, response: Response, db: AsyncSession = Depends(get_session)
):
    return await authenticate_user(data=data, db=db, response=response)


@router.post("/refresh/")
async def refresh_access_token(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_session),
):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing in cookies",
        )

    return await refresh_access_token_check(
        refresh_token=refresh_token, db=db, response=response
    )
