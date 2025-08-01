from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_access_token,
)

from .models import SellerModel
from .schemas import SellerCreateSchema


async def create_seller(data: SellerCreateSchema, db: AsyncSession):
    if await email_exists(data.email, db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists"
        )

    new_seller = SellerModel(
        email=data.email,
        password=hash_password(data.password),
        type_organization=data.type_organization,
        country=data.country,
        itn=data.itn,
        name=data.name,
        last_name=data.last_name,
        patronymic=data.patronymic,
        company_name=data.company_name,
    )

    db.add(new_seller)
    await db.commit()
    await db.refresh(new_seller)

    access_token = create_access_token(new_seller.id, "seller")
    refresh_token = create_refresh_token(new_seller.id, "seller")

    new_seller.refresh_token = refresh_token

    await db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer",
    }


async def get_seller_by_email(email: str, db: AsyncSession):
    result = await db.execute(select(SellerModel).where(SellerModel.email == email))
    return result.scalar_one_or_none()


async def get_seller_by_id(user_id: int, db: AsyncSession):
    result = await db.execute(select(SellerModel).where(SellerModel.id == user_id))
    return result.scalar_one_or_none()


async def email_exists(email: str, db: AsyncSession):
    seller = await get_seller_by_email(email, db)
    return seller is not None


async def get_current_seller(token: str, db: AsyncSession):
    data = verify_access_token(token=token)

    if data.get("role") == "seller":
        return await get_seller_by_id(data.get("user_id"), db)
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token"
        )
