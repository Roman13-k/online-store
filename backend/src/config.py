from pydantic_settings import BaseSettings


class DatabaseConfig(BaseSettings):
    DB_URL: str = "postgresql+asyncpg://name:pass@localhost:5432/onechapter"
    DB_ECHO: bool = False


database_config = DatabaseConfig()


class JWTConfig(BaseSettings):
    SECRET_KEY: str = "p0iy3I05KmNOh8Zjk2eTlVcrccX2VSR-Mfh-BMARw-jV1OpU3f7UDNoyZNae2DyWj0446eeuDi1edHyCPF43PQ"  # It's example
    ALGORITHM: str = "HS256"


jwt_config = JWTConfig()
