from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import hash_password

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
    return new_buyer


async def get_buyer_by_email(email: str, db: AsyncSession):
    result = await db.execute(select(BuyerModel).where(BuyerModel.email == email))
    return result.scalar_one_or_none()


async def get_buyer_by_id(user_id: int, db: AsyncSession):
    result = await db.execute(select(BuyerModel).where(BuyerModel.id == user_id))
    return result.scalar_one_or_none()


async def email_exists(email: str, db: AsyncSession):
    buyer = await get_buyer_by_email(email, db)
    return buyer is not None
