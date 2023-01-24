from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
        prefix="/api/stations",
        tags=['Stations']
)

@router.post("/", status_code = status.HTTP_201_CREATED, response_model=schemas.StationOut)
def create_station(station: schemas.StationCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    # hash the password - station.password
    hashed_password = utils.hash(str(station.password))
    station.password = hashed_password

    new_station = models.Station(user_id=current_user.user_id, **station.dict())
    db.add(new_station)
    db.commit()
    db.refresh(new_station)

    return new_station

@router.get("/{id}", response_model=schemas.StationOut)
def get_station(id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    station = db.query(models.Station).filter(models.Station.station_id==id).first()
    if not station:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Station with id: {id} does not exist")

    return station

@router.delete("/{station_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_station(station_id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):

    station = db.query(models.Station).filter(models.Station.station_id == station_id)

    if station.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"station with id: {station_id} does not exist")
    station.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put("/{station_id}", response_model=schemas.StationOut)
def update_record(station_id: int, update_station: schemas.StationCreate, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    station_query = db.query(models.Station).filter(models.Station.station_id == station_id)
    station = station_query.first()

    if station == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"station with id: {station_id} does not exist")

    station_query.update(update_station.dict(), synchronize_session=False)
    db.commit()

    return station_query.first()
