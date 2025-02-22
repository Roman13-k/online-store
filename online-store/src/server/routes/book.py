from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import async_session
from database.models import BookModel
from schemes import BookAddSchema
from utils.images import save_image

book_router = APIRouter(tags=["books (main stage) 📖"])


async def get_session():
    async with async_session() as conn:
        yield conn


@book_router.post("/book")
async def create_book(
    book: BookAddSchema = Depends(),
    image: UploadFile = File(...),
    db: AsyncSession = Depends(get_session),
):
    filename = save_image(image)
    new_book = BookModel(
        image_url=filename,
        title=book.title,
        description=book.description,
        type_book=book.type_book,
        price=book.price,
        author=book.author,
        age_reader=book.age_reader,
        language=book.language,
        type_cover=book.type_cover,
        publishing=book.publishing,
        isbn=book.isbn,
        series=book.series,
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
