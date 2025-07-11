import os
import uuid
import shutil
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOW_EXTENSIONS = {"image/jpeg", "image/png", "video/mp4"}


def save_image(image: UploadFile) -> str:
    if image.content_type not in ALLOW_EXTENSIONS:
        raise HTTPException(status_code=400, detail="File is not support")

    file_ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return filename
