from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.router import oauth2_scheme
from src.database import get_session

from .schemas import BookSchema
from .service import create_book, get_book_by_category, get_book_by_id

router = APIRouter(prefix="/book", tags=["Books 📕"])


@router.post("/add")
async def add_book(
    data: BookSchema,
    token=Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_session),
):
    return await create_book(data=data, token=token, db=db)


@router.get("/{id}")
async def get_book_with_id(id: int, db: AsyncSession = Depends(get_session)):
    return await get_book_by_id(id=id, db=db)


@router.get("/")
async def get_book_with_category(
    category: str, db: AsyncSession = Depends(get_session)
):
    return await get_book_by_category(category=category, db=db)
