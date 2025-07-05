from fastapi import APIRouter, Form, Depends, File, UploadFile, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_session
from src.database.models import BookModel
from src.utils.images import save_image

book_router = APIRouter(tags=["books (main stage) 📖"])


@book_router.post("/book")
async def create_book(
    title: str = Form(...),
    description: str = Form(...),
    type_book: str = Form(...),
    price: float = Form(...),
    author: str = Form(...),
    age_reader: int = Form(...),
    language: str = Form(...),
    type_cover: str = Form(...),
    publishing: str = Form(...),
    isbn: int = Form(...),
    series: str = Form(...),
    image: UploadFile = File(...),
    db: AsyncSession = Depends(get_session),
):
    filename = save_image(image)
    new_book = BookModel(
        image_url=filename,
        title=title,
        description=description,
        type_book=type_book,
        price=price,
        author=author,
        age_reader=age_reader,
        language=language,
        type_cover=type_cover,
        publishing=publishing,
        isbn=isbn,
        series=series,
    )

    db.add(new_book)
    await db.commit()
    return {"message": "OK"}


@book_router.get("/book/{book_id}")
async def get_book(book_id: int, db: AsyncSession = Depends(get_session)):
    response = await db.execute(select(BookModel).where(BookModel.book_id == book_id))
    book = response.scalar_one_or_none()

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    return book
