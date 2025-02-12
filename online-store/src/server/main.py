from fastapi import FastAPI

from database.database import engine
from database.models import Base
from routes.auth import auth_router


app = FastAPI()
app.include_router(auth_router)


@app.post("/create_db", tags=["database (develop stage) 🛠️"]) # Создание базы данных
async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        return {"message": "Database successfully created"}
