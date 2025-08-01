from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_access_token,
)

from .models import BuyerModel
from .schemas import BuyerCreateSchema


async def create_buyer(data: BuyerCreateSchema, db: AsyncSession):
    if await email_exists(data.email, db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists"
        )

    new_buyer = BuyerModel(email=data.email, password=hash_password(data.password))

    db.add(new_buyer)
    await db.commit()
    await db.refresh(new_buyer)

    access_token = create_access_token(new_buyer.id, "buyer")
    refresh_token = create_refresh_token(new_buyer.id, "buyer")

    new_buyer.refresh_token = refresh_token

    await db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer",
    }


async def get_buyer_by_email(email: str, db: AsyncSession):
    result = await db.execute(select(BuyerModel).where(BuyerModel.email == email))
    return result.scalar_one_or_none()


async def get_buyer_by_id(user_id: int, db: AsyncSession):
    result = await db.execute(select(BuyerModel).where(BuyerModel.id == user_id))
    return result.scalar_one_or_none()


async def email_exists(email: str, db: AsyncSession):
    buyer = await get_buyer_by_email(email, db)
    return buyer is not None


async def get_current_buyer(token: str, db: AsyncSession):
    data = verify_access_token(token=token)

    if data.get("role") == "buyer":
        return await get_buyer_by_id(data.get("user_id"), db)
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token"
        )
