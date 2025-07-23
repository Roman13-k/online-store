from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_session

from .schemas import SellerCreateSchema
from .service import create_seller

router = APIRouter(prefix="/seller", tags=["Sellers 🛒"])


@router.post("/registration")
async def registration_seller(
    data: SellerCreateSchema, db: AsyncSession = Depends(get_session)
):
    return await create_seller(data, db)
