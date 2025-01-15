from fastapi import APIRouter, File, UploadFile
from app.schema.schema import Face_recognition_post_schema

from app.repository.face_recognition_repository import face_recognition_post_repo

router = APIRouter(prefix="/face_recognition", tags=["face_recognition"])

@router.post("/post")
async def face_recognition_post(name:Face_recognition_post_schema, file: UploadFile = File(...), camera_capture: UploadFile = File(...)):
    response = face_recognition_post_repo(name, file, camera_capture)
    try:
        return response 
    except Exception as e:
        return {"error": str(e)}