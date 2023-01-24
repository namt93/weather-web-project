from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from . import models
from .database import engine, get_db
from .routers import user, auth, record, station, search



models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Cross_Origin Resource Sharing
origins = ["http://localhost:5501","http://localhost:8000/api/search",
        "http://localhost:5501/api/search", "http://localhost:8000/",
        "https://www.google.com"
        ]

app.add_middleware(CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )

while True:
    try:
        conn = psycopg2.connect(host='localhost', database='weatherweb', user='postgres',
                password='nam09032001', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print("Database connection was succesfull!")
        break
    except Exception as error:
        print("Connection to database failed")
        print("Error: ", error)
        time.sleep(2)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(record.router)
app.include_router(station.router)
app.include_router(search.router)

# uvicorn backend.main:app --host localhost --port 5501 --reload

@app.get("/")
def root():
    return {"message": "Hello World"}
