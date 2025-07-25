from sqlalchemy.ext.asyncio import AsyncSession


async def authenticate_user(email: str, password: str, role: str, db: AsyncSession): ...
