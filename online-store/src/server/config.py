from pydantic_settings import BaseSettings


class DatabaseConfig(BaseSettings):
    DB_URL: str = "postgresql+asyncpg://name:pass@localhost:5432/onechapter"
    DB_ECHO: bool = False


database_config = DatabaseConfig()
