from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Numeric
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from .database import Base

# the record table in datebase
class Record(Base):
    __tablename__ = "records"
    
    record_id = Column(Integer, primary_key=True, nullable=False)
    temperature = Column(Numeric, nullable=False)
    humidity = Column(Integer, nullable=False)
    wind_speed = Column(Numeric, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), 
            nullable=False, server_default=text('now()'))
    station_id = Column(Numeric, ForeignKey("weather_stations.station_id", ondelete="CASCADE"), nullable=False)
    
# the weather station table in database
class Station(Base):
    __tablename__ = "weather_stations"

    station_id = Column(Integer, primary_key=True, nullable=False)
    password = Column(String, nullable=False)


#the user table in database
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, nullable=False)
    role = Column(String, nullable=False, server_default=text('user'))
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
            nullable=False, server_default=text('now()'))


