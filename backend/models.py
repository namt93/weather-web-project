from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from .database import Base

# the record table in datebase
class Record(Base):
    __tablename__ = "records"
    
    record_id = Column(Integer, primary_key=True, nullable=False)
    temperature = Column(Numeric, nullable=False)
    humidity = Column(Integer, nullable=False)
    max_wind_speed = Column(Numeric, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), 
            nullable=False, server_default=text('now()'))
    station_id = Column(Integer, ForeignKey("weather_stations.station_id"), nullable=False)
    wind_direction = Column(Integer, nullable=False)
    average_wind_speed = Column(Numeric, nullable=False)
    rain_fall_one_hour = Column(Numeric)
    rain_fall_one_day = Column(Numeric)
    barometric_pressure = Column(Numeric, nullable=False)
    
# the weather station table in database
class Station(Base):
    __tablename__ = "weather_stations"

    station_id = Column(Integer, primary_key=True, nullable=False)
    password = Column(String, nullable=False)
    station_name = Column(String(20), nullable=False)
    station_position = Column(String, nullable=False)
    longitude = Column(String(20), nullable=False)
    latitude = Column(String(20), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), 
            nullable=False, server_default=text('now()'))


#the user table in database
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String(20), nullable=False)
    user_avatar = Column(String)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
            nullable=False, server_default=text('now()'))


