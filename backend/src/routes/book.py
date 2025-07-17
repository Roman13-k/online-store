from typing import List
from fastapi import APIRouter, Form, Depends, File, UploadFile, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.database import get_session
from src.database.models import BookImageModel, BookModel
from src.utils.images import save_multiple_images

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
    images: List[UploadFile] = File(...),
    main_image_index: int = Form(0),
    db: AsyncSession = Depends(get_session),
):
    saved_filenames = save_multiple_images(images)
    new_book = BookModel(
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
    await db.flush()

    for i, filename in enumerate(saved_filenames):
        is_main = i == main_image_index
        book_image = BookImageModel(
            book_id=new_book.book_id, filename=filename, is_main=is_main
        )
        db.add(book_image)

    await db.commit()

    return {
        "message": "Book created successfully",
        "book_id": new_book.book_id,
        "images_count": len(saved_filenames),
    }


@book_router.get("/book/{book_id}")
async def get_book(book_id: int, db: AsyncSession = Depends(get_session)):
    response = await db.execute(select(BookModel).where(BookModel.book_id == book_id))
    book = response.scalar_one_or_none()

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    return book
