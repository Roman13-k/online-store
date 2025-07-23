from argon2 import PasswordHasher

ph = PasswordHasher()


def hash_password(password: str) -> str:
    return ph.hash(password=password)


def verify_password(password: str, hashed_password: str) -> bool:
    return ph.verify(password=password, hash=hashed_password)
