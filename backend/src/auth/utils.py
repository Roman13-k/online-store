from datetime import datetime, timedelta, timezone

import jwt
from argon2 import PasswordHasher
from fastapi import HTTPException, status

from src.core.config import jwt_config

ph = PasswordHasher()


def hash_password(password: str) -> str:
    return ph.hash(password=password)


def verify_password(password: str, hashed_password: str) -> bool:
    return ph.verify(password=password, hash=hashed_password)


def create_access_token(user_id: int, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=1)
    payload = {
        "user_id": user_id,
        "role": role,
    }
    payload.update({"exp": expire})
    token = jwt.encode(payload, jwt_config.SECRET_KEY, algorithm="HS256")
    return token


def create_refresh_token(user_id: int, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=14)
    payload = {
        "user_id": user_id,
        "role": role,
    }
    payload.update({"exp": expire})
    token = jwt.encode(payload, jwt_config.SECRET_KEY, algorithm="HS256")
    return token


def verify_access_token(token: str):
    try:
        data = jwt.decode(token, jwt_config.SECRET_KEY, algorithms=["HS256"])
        expire = data["expires"]

        if expire is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Token has expired"
            )

        if datetime.utcnow() > datetime.utcfromtimestamp(expire):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Token has expired"
            )

        return data

    except jwt.exceptions.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
        )


def verify_refresh_token(token: str) -> dict:
    try:
        data = jwt.decode(token, jwt_config.SECRET_KEY, algorithms=["HS256"])
        expire = data["expires"]

        if expire is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No refresh token supplied",
            )

        if datetime.utcnow() > datetime.utcfromtimestamp(expire):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Refresh token expired!"
            )

        return data

    except jwt.exceptions.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
        )
