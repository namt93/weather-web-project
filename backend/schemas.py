from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Record schemas
class RecordBase(BaseModel):
    temperature: float
    humidity: int
    wind_speed: float

class RecordCreate(RecordBase):
    station_id: int
    password: str

class Record(RecordBase):
    record_id: int
    created_at: datetime
    station_id: int

    class Config:
        orm_mode = True

# Weather Station schemas
class StationCreate(BaseModel):
    station_id: int
    password: str

class StationOut(BaseModel):
    station_id: int

    class Config:
        orm_mode = True

class StationLogin(BaseModel):
    station_id: int
    password: str

# User schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class UserBase(BaseModel):
    username: str
    role: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None
    role: Optional[str] = None
