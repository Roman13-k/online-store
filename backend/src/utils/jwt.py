import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.models import BuyerModel, SellerModel
from src.database.database import get_session
from src.config import jwt_config

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=20)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, jwt_config.SECRET_KEY, algorithm=jwt_config.ALGORITHM
    )
    return encoded_jwt


async def get_current_buyer(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)
):
    try:
        payload = jwt.decode(
            token, jwt_config.SECRET_KEY, algorithms=[jwt_config.ALGORITHM]
        )

        id: int = payload.get("id")

        if id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )

        buyer = await db.execute(select(BuyerModel).where(BuyerModel.id == id))
        buyer = buyer.scalar_one_or_none()

        return buyer

    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


async def get_current_seller(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)
):
    try:
        payload = jwt.decode(
            token, jwt_config.SECRET_KEY, algorithms=[jwt_config.ALGORITHM]
        )

        id: int = payload.get("id")

        if id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )

        seller = await db.execute(select(SellerModel).where(SellerModel.id == id))
        seller = seller.scalar_one_or_none()

        return seller

    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
