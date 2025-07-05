from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes.auth import auth_router
from src.routes.book import book_router


app = FastAPI()
app.include_router(auth_router)
app.include_router(book_router)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
