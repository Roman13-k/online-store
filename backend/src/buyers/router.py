from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_session

from .schemas import BuyerCreateSchema
from .service import create_buyer, get_current_buyer

router = APIRouter(prefix="/buyer", tags=["Buyers 💳"])


@router.post("/registration/")
async def registration_buyer(
    data: BuyerCreateSchema, db: AsyncSession = Depends(get_session)
):
    return await create_buyer(data=data, db=db)


@router.post("/me/")
async def get_profile(token: str, db=Depends(get_session)):
    return await get_current_buyer(token=token, db=db)
