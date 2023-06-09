from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Record schemas
class RecordBase(BaseModel):
    temperature: float
    rain_cumulative: float
    rain_per_min: float
    rain_per_hour: float
    wind_speed_max: float
    wind_speed_min: float
    wind_direction_at_max: int
    wind_direction_at_min: int
    visibility_max: float
    visibility_min: float

class RecordCreate(RecordBase):
    station_id: int
    password: str


class OperationalRecord(RecordBase):
    operational_record_id: int
    created_at: datetime
    station_id: int

    class Config:
        orm_mode = True

class StoredRecord(RecordBase):
    stored_record_id: int
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

# Warning schemas
class WarningBase(BaseModel):
    wind: str
    rain: str
    visibility: str

class WarningCreate(WarningBase):
    station_id: int
    password: str

class WarningUpdate(BaseModel):
    warning_id: int
    is_active: bool

class Warning(WarningBase):
    warning_id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    station_id: int

    class Config:
        orm_mode = True

# Error schemas
class ErrorBase(BaseModel):
    sensor_is_broken: str

class ErrorCreate(ErrorBase):
    station_id: int
    password: str

class ErrorUpdate(BaseModel):
    error_id: int
    is_active: bool

class Error(ErrorBase):
    error_id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    station_id: int

    class Config:
        orm_mode = True
