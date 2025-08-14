from fastapi import HTTPException, status
from rapidfuzz import fuzz, process
from sqlalchemy import delete, select
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


async def get_book_by_title(title: str, db: AsyncSession):
    result = await db.execute(select(BookModel.id, BookModel.title))
    all_books = result.all()

    book_choices = {book.id: book.title for book in all_books}

    search_results = process.extract(title, book_choices, scorer=fuzz.WRatio, limit=5)

    matched_book_ids = [
        book_id for title, score, book_id in search_results if score > 70
    ]

    if not matched_book_ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
        )

    stmt_final_books = select(BookModel).where(BookModel.id.in_(matched_book_ids))
    result = await db.execute(stmt_final_books)

    final_books = result.scalars().all()

    return {"books": final_books}


async def get_books(db: AsyncSession):
    books = await db.execute(select(BookModel))
    books = books.scalars().all()

    return books


async def delete_book(id: int, token: str, db: AsyncSession):
    user_data = verify_access_token(token=token)
    user_role = user_data.get("role")

    if user_role == "seller":
        user_id = user_data.get("user_id")
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You are not seller"
        )

    book = await db.execute(select(BookModel).where(BookModel.id == id))
    book = book.scalar_one_or_none()

    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
        )

    if book.seller_id == user_id:
        await db.execute(delete(BookModel).where(BookModel.id == id))
        await db.commit()

        return {"message": "Book deleted successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
