from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from . import models
from .database import engine, get_db
from .routers import user, auth, record, station



models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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
