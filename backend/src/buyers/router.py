from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_session

from .schemas import BuyerCreateSchema
from .service import create_buyer

router = APIRouter(prefix="/buyer", tags=["Buyers 💳"])


@router.post("/registration/")
async def registration_buyer(
    data: BuyerCreateSchema, db: AsyncSession = Depends(get_session)
):
    return await create_buyer(data, db)
