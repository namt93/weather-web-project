from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, func
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean
from sqlalchemy.sql.expression import text
from .database import Base

  
# the weather station table in database
class Station(Base):
    __tablename__ = "weather_stations"

    station_id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    password = Column(String, nullable=False)
    station_name = Column(String(20), nullable=False)
    station_position = Column(String, nullable=False)
    longitude = Column(String(20), nullable=False)
    latitude = Column(String(20), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(TIMESTAMP(timezone=True), 
            nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, default=func.now(), onupdate=func.now())


#the user table in database
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    username = Column(String(20), nullable=False)
    user_avatar = Column(String)
    email = Column(String, nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    role = Column(String, nullable=False, default="User")
    created_at = Column(TIMESTAMP(timezone=True),
            nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, default=func.now(), onupdate=func.now())


#the record table used for displaying
class OperationalRecord(Base):
    __tablename__ = "operational_record" 
    
    operational_record_id = Column(Integer, primary_key=True, autoincrement=True)
    station_id = Column(Integer, ForeignKey("weather_stations.station_id"), nullable=False)
    temperature = Column(Numeric, nullable=False)
    rain_cumulative = Column(Numeric, nullable=False)
    rain_per_min = Column(Numeric, nullable=False)
    rain_per_hour = Column(Numeric, nullable=False)
    wind_speed_max = Column(Numeric, nullable=False)
    wind_speed_min = Column(Numeric, nullable=False)
    wind_direction_at_max = Column(Integer, nullable=False)
    wind_direction_at_min = Column(Integer, nullable=False)
    visibility_max = Column(Numeric, nullable=False)
    visibility_min = Column(Numeric, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), 
            nullable=False, server_default=text('now()'))

#the record is stored every 30min
class StoredRecord(Base):
    __tablename__ = "storage_record"

    stored_record_id = Column(Integer, primary_key=True, autoincrement=True)
    station_id = Column(Integer, ForeignKey("weather_stations.station_id"), nullable=False)
    temperature = Column(Numeric, nullable=False)
    rain_cumulative = Column(Numeric, nullable=False)
    rain_per_min = Column(Numeric, nullable=False)
    rain_per_hour = Column(Numeric, nullable=False)
    wind_speed_max = Column(Numeric, nullable=False)
    wind_speed_min = Column(Numeric, nullable=False)
    wind_direction_at_max = Column(Integer, nullable=False)
    wind_direction_at_min = Column(Integer, nullable=False)
    visibility_max = Column(Numeric, nullable=False)
    visibility_min = Column(Numeric, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), 
            nullable=False, server_default=text('now()'))

class Warning(Base):
    __tablename__ = "warning"

    warning_id = Column(Integer, primary_key=True, autoincrement=True)
    station_id = Column(Integer, ForeignKey("weather_stations.station_id"), nullable=False)
    wind = Column(String(100), nullable=False)
    rain = Column(String(100), nullable=False)
    visibility = Column(String(100), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(TIMESTAMP(timezone=True),
            nullable=False, default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False,
            default=func.now(), onupdate=func.now())

class Error(Base):
    __tablename__ = "error"

    error_id = Column(Integer, primary_key=True, autoincrement=True)
    station_id = Column(Integer, ForeignKey("weather_stations.station_id"), nullable=False)
    sensor_is_broken = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(TIMESTAMP(timezone=True),
            nullable=False, default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False,
            default=func.now(), onupdate=func.now())
    
