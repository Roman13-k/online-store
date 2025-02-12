from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

engine = create_async_engine("sqlite+aiosqlite:///onechapter.db")
async_session = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)