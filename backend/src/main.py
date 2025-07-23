from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.buyers.router import router as buyers_router
from src.sellers.router import router as sellers_router

app = FastAPI(title="Onechapter API")
app.include_router(buyers_router)
app.include_router(sellers_router)

origins = ["http://localhost:3000", "https://online-store-one-rho.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/")
async def root():
    return {"status": "OK"}
