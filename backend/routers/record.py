from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import distinct, func
from fastapi_utils.session import FastAPISessionMaker
from fastapi_utils.tasks import repeat_every
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import text
from typing import List
from .. import models, schemas, utils, oauth2
from ..database import get_db, SQLALCHEMY_DATABASE_URL

router = APIRouter(
        prefix="/api/records",
        tags=['Records']
)

sessionmaker = FastAPISessionMaker(SQLALCHEMY_DATABASE_URL)

@router.get("/", response_model=List[schemas.StoredRecord])
def get_records(db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    records = db.query(models.OperationalRecord).all()
    return records


@router.post("/", status_code = status.HTTP_201_CREATED, response_model=schemas.OperationalRecord)
def create_records(record: schemas.RecordCreate, db: Session = Depends(get_db)):

    # verify the station Id
    station = db.query(models.Station).filter(
            models.Station.station_id == record.station_id).first()

    if not station:
        raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid ")

    # verify the station password
    if not utils.verify(record.password, station.password):
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Station Id or password")

    # Add the new_record
    record_dict = record.dict()
    record_dict.pop("password")
#    print(type(record_dict))
#    print(record_dict)
    new_record = models.OperationalRecord(**record_dict)
#    print(new_record.__dict__)
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    
    return new_record


# Get record with record Id
@router.get("/{id}", response_model=schemas.StoredRecord)
def get_record_by_record_id(id: int, db: Session = Depends(get_db)):
    record = db.query(models.StoredRecord).filter(models.StoredRecord.record_id == id).first()

    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"record with id: {id} was not found")
    return record


# Get records created by station
@router.get("/station/{station_id}", response_model=List[schemas.StoredRecord])
def get_records_by_station_id(station_id: int, db: Session = Depends(get_db)):
    records = db.query(models.StoredRecord).filter(models.StoredRecord.station_id == station_id).all()
    return records


# Get the latest record of station
@router.get("/latest/station/{station_id}", response_model=schemas.OperationalRecord)
def get_latest_record_by_station_id(station_id: int, db: Session = Depends(get_db)):
    latest_record = db.query(models.StoredRecord).filter(models.StoredRecord.station_id == station_id).all()[-1]
    return latest_record

# Get the 12 hours records of station
@router.get("/hourly/12hour/station/{station_id}", response_model=List[schemas.StoredRecord])
def get_12hour_records_by_station_id(station_id: int, db: Session = Depends(get_db)):
    records_12hour_by_station_id = db.query(models.StoredRecord).filter(models.StoredRecord.created_at > text('now() - interval \'12 hour\''), models.StoredRecord.station_id == station_id).all()
    return records_12hour_by_station_id

# Get the 5 days records of station
@router.get("/daily/5day/station/{station_id}", response_model=List[schemas.OperationalRecord])
def get_5day_records_by_station_id(station_id: int, db: Session = Depends(get_db)):
    records_5day_by_station_id = db.query(models.StoredRecord).filter(models.StoredRecord.created_at > text('now() - interval \'5 day\''), models.StoredRecord.station_id == station_id).all()
    return records_5day_by_station_id
    
# Delete record by record Id
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):

    record = db.query(models.StoredRecord).filter(models.StoredRecord.record_id == id)

    if record.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"record with id: {id} does not exist")
    record.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Update record
@router.put("/{id}", response_model=schemas.OperationalRecord)
def update_record(id: int, updated_record: schemas.RecordCreate, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    record_query = db.query(models.StoredRecord).filter(models.StoredRecord.record_id == id)
    record = record_query.first()

    if record == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"record with id: {id} does not exist")
    updated_record_dict = updated_record.dict()
    updated_record_dict.pop("password")

    print(updated_record_dict)
    record_query.update(updated_record_dict, synchronize_session=False)

    db.commit()

    return record_query.first()

# Store the record every 10 seconds
def count_stations(db: Session):
    number_stations = db.query(func.count(models.Station.station_id)).scalar()
    last_operational_records_query = db.query(models.OperationalRecord).order_by(models.OperationalRecord.operational_record_id.desc()).limit(number_stations).all()

    # Pop attributes from operational record objects
    last_operational_records_query[-1].__dict__.pop("operational_record_id")
    last_operational_records_query[-1].__dict__.pop("_sa_instance_state")
    last_operational_records_query[-1].__dict__.pop("created_at")

    last_operational_records_dict = last_operational_records_query[-1].__dict__
    last_operational_records_dict['temperature'] = float(last_operational_records_dict['temperature'])
    last_operational_records_dict['rain_per_min'] = float(last_operational_records_dict['rain_per_min'])
    last_operational_records_dict['wind_speed_max'] = float(last_operational_records_dict['wind_speed_max'])
    last_operational_records_dict['visibility_max'] = float(last_operational_records_dict['visibility_max'])
    last_operational_records_dict['rain_cumulative'] = float(last_operational_records_dict['rain_cumulative'])
    last_operational_records_dict['rain_per_hour'] = float(last_operational_records_dict['rain_per_hour'])
    last_operational_records_dict['wind_speed_min'] = float(last_operational_records_dict['wind_speed_min'])
    last_operational_records_dict['visibility_min'] = float(last_operational_records_dict['visibility_min'])

    new_stored_record = models.StoredRecord(**last_operational_records_dict)
#    db.add(new_stored_record)
#    db.commit()
#    print("hihihihihihi")


@router.on_event("startup")
@repeat_every(seconds=6, wait_first=True)
def load_operational_records_to_storage_task():
    with sessionmaker.context_session() as db:
        count_stations(db=db)
