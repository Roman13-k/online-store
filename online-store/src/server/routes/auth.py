from fastapi import APIRouter, Depends, HTTPException
from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import async_session
from database.models import BuyerModel, SellerModel
from schemes import BuyerSchema, SellerSchema
from utils.security import hash_password, verify_password

auth_router = APIRouter(tags=["auth (main stage) 🔐"])


async def get_session():
    async with async_session() as conn:
        yield conn


@auth_router.post("/registration/buyer")  # Регистрация покупателя
async def registration_buyer(
    buyer: BuyerSchema, db: AsyncSession = Depends(get_session)
):
    check_buyer = await db.execute(
        select(BuyerModel).where(BuyerModel.email == buyer.email)
    )
    check_buyer = check_buyer.scalar_one_or_none()

    check_seller = await db.execute(
        select(SellerModel).where(SellerModel.email == buyer.email)
    )
    check_seller = check_seller.scalar_one_or_none()

    if check_buyer:
        raise HTTPException(status_code=409, detail="Email is already taken")
    if check_seller:
        raise HTTPException(status_code=409, detail="You are seller")

    hashed_password = hash_password(buyer.password)
    new_buyer = BuyerModel(email=buyer.email, password=hashed_password)

    db.add(new_buyer)
    await db.commit()
    return {"message": "OK"}


@auth_router.post("/registration/seller")  # Регистрация продавца
async def registration_seller(
    seller: SellerSchema, db: AsyncSession = Depends(get_session)
):
    check_seller = await db.execute(
        select(SellerModel).where(SellerModel.email == seller.email)
    )
    check_seller = check_seller.scalar_one_or_none()

    check_buyer = await db.execute(
        select(BuyerModel).where(BuyerModel.email == seller.email)
    )
    check_buyer = check_buyer.scalar_one_or_none()

    if check_seller:
        raise HTTPException(status_code=409, detail="Email is already taken")
    if check_buyer:
        raise HTTPException(status_code=409, detail="You are buyer")

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


@auth_router.post("/login/buyer")  # Вход покупателя
async def login_buyer(
    email: EmailStr, password: str, db: AsyncSession = Depends(get_session)
):
    buyer = await db.execute(select(BuyerModel).where(BuyerModel.email == email))
    buyer = buyer.scalar_one_or_none()

    if not buyer or not verify_password(password, buyer.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"id": buyer.id, "email": buyer.email}


@auth_router.post("/login/seller")  # Вход продавца
async def login_seller(
    email: EmailStr, password: str, db: AsyncSession = Depends(get_session)
):
    seller = await db.execute(select(SellerModel).where(SellerModel.email == email))
    seller = seller.scalar_one_or_none()

    if not seller or not verify_password(password, seller.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {
        "id": seller.id,
        "email": seller.email,
        "type_organization": seller.type_organization,
        "country": seller.country,
        "itn": seller.itn,
        "name": seller.name,
        "last_name": seller.last_name,
        "patronymic": seller.patronymic,
        "company_name": seller.company_name
    }
