from pydantic import BaseModel


class BookSchema(BaseModel):
    title: str
    characteristics: str
    year: int
    category: str
    type_book: str
    author: str
    price: int
    type_cover: str
    publishing: str
    isbn: str
    series: str
