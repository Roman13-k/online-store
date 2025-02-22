from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from database.database import engine
from database.models import Base
from routes.auth import auth_router
from routes.book import book_router


app = FastAPI()
app.include_router(auth_router)
app.include_router(book_router)

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.post("/create_db", tags=["database (develop stage) 🛠️"])  # Создание базы данных
async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        return {"message": "Database successfully created"}
    

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)