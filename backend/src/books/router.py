from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.router import oauth2_scheme
from src.database import get_session

from .schemas import BookSchema
from .service import (
    create_book,
    delete_book,
    get_book_by_category,
    get_book_by_id,
    get_book_by_title,
    get_books,
)

router = APIRouter(prefix="/book", tags=["Books 📕"])


@router.get("/search-by-category/")
async def get_book_with_category(
    category: str, db: AsyncSession = Depends(get_session)
):
    return await get_book_by_category(category=category, db=db)


@router.get("/search-by-title/")
async def get_book_with_title(title: str, db: AsyncSession = Depends(get_session)):
    return await get_book_by_title(title=title, db=db)


@router.get("/{id}/")
async def get_book_with_id(id: int, db: AsyncSession = Depends(get_session)):
    return await get_book_by_id(id=id, db=db)


@router.get("/all")
async def get_all_books(db: AsyncSession = Depends(get_session)):
    return await get_books(db=db)


@router.delete("/{id}/")
async def delete_book_with_id(
    id: int, token=Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)
):
    return await delete_book(id=id, token=token, db=db)


@router.post("/add/")
async def add_book(
    data: BookSchema,
    token=Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_session),
):
    return await create_book(data=data, token=token, db=db)
