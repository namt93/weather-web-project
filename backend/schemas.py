from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Record schemas
class RecordBase(BaseModel):
    temperature: float
    humidity: int
    wind_direction: int
    average_wind_speed: float
    max_wind_speed: float
    barometric_pressure: float

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
    password: str
    station_name: str
    station_position: str
    longitude: Optional[str] = None
    latitude: Optional[str] = None

class StationOut(BaseModel):
    station_id: int
    station_name: str
    station_position: str
    created_at: datetime
    user_id: int

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
    email: EmailStr
    password: str

class UserOut(BaseModel):
    user_id: int
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
