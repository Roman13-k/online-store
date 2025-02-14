from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine
from database.models import Base
from routes.auth import auth_router


app = FastAPI()
app.include_router(auth_router)

origins = [
    "http://localhost:5174/"
]

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
=======
    allow_origins=["http://localhost:5174"],  # Разрешить фронту отправлять запросы
    allow_credentials=True,  # Разрешить отправлять куки и заголовки авторизации
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Разрешённые методы
    allow_headers=["Authorization", "Content-Type"],  # Разрешённые заголовки
>>>>>>> d4626d5a4a9497f83e7cf1d567506b61c1c7cd4f
)

@app.post("/create_db", tags=["database (develop stage) 🛠️"]) # Создание базы данных
async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        return {"message": "Database successfully created"}
