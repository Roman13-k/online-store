from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.router import oauth2_scheme
from src.database import get_session

from .schemas import SellerCreateSchema, SellerResponseSchema
from .service import create_seller, get_current_seller

router = APIRouter(prefix="/seller", tags=["Sellers 🛒"])


@router.post("/registration/")
async def registration_seller(
    data: SellerCreateSchema,
    response: Response,
    db: AsyncSession = Depends(get_session),
):
    return await create_seller(data=data, db=db, response=response)


@router.post("/me/")
async def get_profile_seller(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)
):
    user = await get_current_seller(token=token, db=db)

    if user:
        return SellerResponseSchema(
            id=user.id,
            email=user.email,
            type_organization=user.type_organization,
            country=user.country,
            itn=user.itn,
            name=user.name,
            last_name=user.last_name,
            patronymic=user.patronymic,
            company_name=user.company_name,
            is_active=user.is_active,
        )
    else:
        return user
