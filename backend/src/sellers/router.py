from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.router import oauth2_scheme
from src.database import get_session

from .schemas import SellerCreateSchema
from .service import create_seller, get_current_seller

router = APIRouter(prefix="/seller", tags=["Sellers 🛒"])


@router.post("/registration/")
async def registration_seller(
    data: SellerCreateSchema, db: AsyncSession = Depends(get_session)
):
    return await create_seller(data=data, db=db)


@router.post("/me/")
async def get_profile_seller(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)
):
    return await get_current_seller(token=token, db=db)
