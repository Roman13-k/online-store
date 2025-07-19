import os
from typing import List
import uuid
import shutil
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOW_EXTENSIONS = {"image/jpeg", "image/png", "video/mp4"}


def save_multiple_images(images: List[UploadFile]) -> List[str]:
    saved_filenames = []

    for image in images:
        if image.content_type not in ALLOW_EXTENSIONS:
            raise HTTPException(
                status_code=400, detail=f"File {image.filename} is not supported"
            )

        file_ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        saved_filenames.append(filename)

    return saved_filenames
