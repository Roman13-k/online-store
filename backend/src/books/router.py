from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.router import oauth2_scheme
from src.database import get_session

from .schemas import BookSchema
from .service import create_book

router = APIRouter(prefix="/book", tags=["Books 📕"])


@router.post("/add")
async def add_book(
    data: BookSchema,
    token=Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_session),
):
    return await create_book(data=data, token=token, db=db)
