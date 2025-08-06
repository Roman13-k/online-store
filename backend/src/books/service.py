from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import verify_access_token

from .models import BookModel
from .schemas import BookSchema


async def create_book(data: BookSchema, token: str, db: AsyncSession):
    user_data = verify_access_token(token=token)

    user_role = user_data.get("role")

    if user_role == "seller":
        user_id = user_data.get("user_id")
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You are not seller"
        )

    new_book = BookModel(
        title=data.title,
        characteristics=data.characteristics,
        year=data.year,
        category=data.category,
        type_book=data.type_book,
        author=data.author,
        price=data.price,
        type_cover=data.type_cover,
        publishing=data.publishing,
        isbn=data.isbn,
        series=data.series,
        seller_id=user_id,
    )

    db.add(new_book)
    await db.commit()
    await db.refresh(new_book)
    return {"book": new_book}


async def get_book_by_id(id: int, db: AsyncSession):
    book = await db.execute(select(BookModel).where(BookModel.id == id))
    book = book.scalar_one_or_none()

    if book:
        return {"book": book}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
        )


async def get_book_by_category(category: str, db: AsyncSession):
    books = await db.execute(select(BookModel).where(BookModel.category == category))
    books = books.scalars().all()

    if books:
        return {"books": books}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
        )
