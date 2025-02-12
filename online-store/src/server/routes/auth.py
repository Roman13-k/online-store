from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import async_session
from database.models import BuyerModel, SellerModel
from schemes import BuyerSchema, SellerSchema
from utils.security import hash_password

auth_router = APIRouter(tags=["auth (main stage) 🔐"])


async def get_session():
    async with async_session() as conn:
        yield conn


@auth_router.post("/registration/buyer")  # Регистрация покупателя
async def registration_buyer(
    buyer: BuyerSchema, db: AsyncSession = Depends(get_session)
):
    hashed_password = hash_password(buyer.password)
    new_buyer = BuyerModel(email=buyer.email, password=hashed_password)

    db.add(new_buyer)
    await db.commit()
    return {"message": "OK"}


@auth_router.post("/registration/seller")
async def registration_seller(
    seller: SellerSchema, db: AsyncSession = Depends(get_session)
):
    hashed_password = hash_password(seller.password)
    new_seller = SellerModel(
        email=seller.email,
        password=hashed_password,
        type_organization=seller.type_organization,
        country=seller.country,
        itn=seller.itn,
        name=seller.name,
        last_name=seller.last_name,
        patronymic=seller.patronymic,
        company_name=seller.company_name,
    )

    db.add(new_seller)
    await db.commit()
    return {"message": "OK"}
