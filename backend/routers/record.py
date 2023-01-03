from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
        prefix="/records",
        tags=['Records']
)

@router.get("/", response_model=List[schemas.Record])
def get_records(db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    records = db.query(models.Record).all()
    return records


@router.post("/", status_code = status.HTTP_201_CREATED, response_model=schemas.Record)
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
    remove_dict = record_dict.pop("password")
    new_record = models.Record(**record_dict)
    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return new_record


# Get record with record Id
@router.get("/{id}", response_model=schemas.Record)
def get_record_by_record_id(id: int, db: Session = Depends(get_db)):
    record = db.query(models.Record).filter(models.Record.record_id == id).first()

    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"record with id: {id} was not found")
    return record


# Get records created by station
@router.get("/station/{station_id}", response_model=List[schemas.Record])
def get_records_by_station_id(station_id: int, db: Session = Depends(get_db)):
    records = db.query(models.Record).filter(models.Record.station_id == station_id).all()
    return records


# Get the latest record of station
@router.get("/latest/station/{station_id}", response_model=schemas.Record)
def get_records_by_station_id(station_id: int, db: Session = Depends(get_db)):
    latest_record = db.query(models.Record).filter(models.Record.station_id == station_id).all()[-1]
    return latest_record


# Delete record by record Id
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):

    record = db.query(models.Record).filter(models.Record.record_id == id)

    if record.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"record with id: {id} does not exist")
    record.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Update record
@router.put("/{id}", response_model=schemas.Record)
def update_record(id: int, updated_record: schemas.RecordCreate, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    record_query = db.query(models.Record).filter(models.Record.record_id == id)
    record = record_query.first()

    if record == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"record with id: {id} does not exist")
    print("haha")
    record_query.update(updated_record.dict(), synchronize_session=False)
    db.commit()

    return record_query.first()
