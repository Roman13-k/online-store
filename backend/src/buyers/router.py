from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.router import oauth2_scheme
from src.database import get_session

from .schemas import BuyerCreateSchema, BuyerResponseSchema
from .service import create_buyer, get_current_buyer

router = APIRouter(prefix="/buyer", tags=["Buyers 💳"])


@router.post("/registration/")
async def registration_buyer(
    data: BuyerCreateSchema, response: Response, db: AsyncSession = Depends(get_session)
):
    return await create_buyer(data=data, db=db, response=response)


@router.get("/me/")
async def get_profile_buyer(
    token: str = Depends(oauth2_scheme), db=Depends(get_session)
):
    user = await get_current_buyer(token=token, db=db)

    if user:
        return BuyerResponseSchema(
            id=user.id, email=user.email, is_active=user.is_active
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized"
        )
