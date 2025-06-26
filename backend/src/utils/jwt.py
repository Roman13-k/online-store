import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone


from src.config import jwt_config

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=20)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, jwt_config.SECRET_KEY, algorithm=jwt_config.ALGORITHM
    )
    return encoded_jwt


def get_current_buyer(
    token: str = Depends(oauth2_scheme),
):
    try:
        payload = jwt.decode(
            token, jwt_config.SECRET_KEY, algorithms=[jwt_config.ALGORITHM]
        )

        id: int = payload.get("id")
        email: int = payload.get("email")

        if id is None or email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )

        return {"id": id, "email": email}

    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


def get_current_seller(
    token: str = Depends(oauth2_scheme),
):
    try:
        payload = jwt.decode(
            token, jwt_config.SECRET_KEY, algorithms=[jwt_config.ALGORITHM]
        )

        id: int = payload.get("id")
        email: str = payload.get("email")
        type_organization: str = payload.get("type_organization")
        country: str = payload.get("country")
        company_name: str = payload.get("company_name")

        if (
            id is None
            or email is None
            or type_organization is None
            or country is None
            or company_name is None
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )

        return {
            "id": id,
            "email": email,
            "type_organization": type_organization,
            "country": country,
            "company_name": company_name,
        }

    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
