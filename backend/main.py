from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import face_recognition_router
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],  # Agrega PATCH a la lista de métodos permitidos,
    allow_headers=["*"],
)

app.include_router(face_recognition_router.router)

if __name__ == "__main__":
    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)