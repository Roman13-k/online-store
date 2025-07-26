from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.buyers.models import BuyerModel
from src.sellers.models import SellerModel

from .schemas import TokenResponse
from .utils import create_access_token, create_refresh_token, verify_password


async def authenticate_user(data: dict, db: AsyncSession):
    if data.user_type == "buyer":
        buyer = await db.execute(
            select(BuyerModel).where(BuyerModel.email == data.email)
        )
        buyer = buyer.scalar_one_or_none()

        if not buyer:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        if not verify_password(data.password, buyer.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        access_token = create_access_token(buyer.id, data.user_type)
        refresh_token = create_refresh_token(buyer.id, data.user_type)

        return TokenResponse(access_token=access_token, refresh_token=refresh_token)

    elif data.user_type == "seller":
        seller = await db.execute(
            select(SellerModel).where(SellerModel.email == data.email)
        )
        seller = seller.scalar_one_or_none()

        if not seller:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        if not verify_password(data.password, seller.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        access_token = create_access_token(seller.id, data.user_type)
        refresh_token = create_refresh_token(seller.id, data.user_type)

        return TokenResponse(access_token=access_token, refresh_token=refresh_token)

    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user type"
        )
