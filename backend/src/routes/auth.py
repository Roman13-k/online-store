from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.models import BuyerModel, SellerModel
from src.schemes import BuyerAddSchema, SellerAddSchema, LoginSchema
from src.utils.security import hash_password, verify_password
from src.utils.jwt import create_access_token, get_current_buyer, get_current_seller
from src.database.database import get_session


auth_router = APIRouter(tags=["auth (main stage) 🔐"])


@auth_router.post("/registration/buyer")
async def registration_buyer(
    buyer: BuyerAddSchema, db: AsyncSession = Depends(get_session)
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
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email is already taken"
        )
    if check_seller:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="You are seller"
        )

    hashed_password = hash_password(buyer.password)
    new_buyer = BuyerModel(email=buyer.email, password=hashed_password)

    db.add(new_buyer)
    await db.commit()
    return {"message": "OK"}


@auth_router.post("/registration/seller")
async def registration_seller(
    seller: SellerAddSchema, db: AsyncSession = Depends(get_session)
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
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email is already taken"
        )
    if check_buyer:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="You are buyer"
        )

    hashed_password = hash_password(seller.password)
    new_seller = SellerModel(
        email=seller.email,
        password=hashed_password,
        type_organization=seller.type_organization,
        country=seller.country,
        itn=int(seller.itn),
        name=seller.name,
        last_name=seller.last_name,
        patronymic=seller.patronymic,
        company_name=seller.company_name,
    )

    db.add(new_seller)
    await db.commit()
    return {"message": "OK"}


@auth_router.post("/login/buyer")
async def login_buyer(
    buyer_schema: LoginSchema, db: AsyncSession = Depends(get_session)
):
    buyer = await db.execute(
        select(BuyerModel).where(BuyerModel.email == buyer_schema.email)
    )
    buyer = buyer.scalar_one_or_none()

    if not buyer or not verify_password(buyer_schema.password, buyer.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )
    jwt = create_access_token({"id": buyer.id, "role": "buyer"})

    response = JSONResponse(content={"message": "Logged in"})
    response.set_cookie(
        key="access_token",
        value=jwt,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=3600,
        path="/",
    )
    return response


@auth_router.post("/login/seller")
async def login_seller(
    seller_schema: LoginSchema, db: AsyncSession = Depends(get_session)
):
    seller = await db.execute(
        select(SellerModel).where(SellerModel.email == seller_schema.email)
    )
    seller = seller.scalar_one_or_none()

    if not seller or not verify_password(seller_schema.password, seller.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )
    jwt = create_access_token({"id": seller.id, "role": "seller"})

    response = JSONResponse(content={"message": "Logged in"})
    response.set_cookie(
        key="access_token",
        value=jwt,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=3600,
        path="/",
    )
    return response


@auth_router.get("/profile/buyer")
async def get_profile_buyer(current_user: dict = Depends(get_current_buyer)):
    return {"profile": current_user}


@auth_router.get("/profile/seller")
async def get_profile_seller(current_user: dict = Depends(get_current_seller)):
    return {"profile": current_user}


@auth_router.post("/logout")
async def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie("access_token")
    return response
