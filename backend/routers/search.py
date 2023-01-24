from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
        prefix="/api/search",
        tags=['Search']
        )

@router.get("", status_code=status.HTTP_200_OK)
def search_both_users_stations(q: str, db: Session = Depends(get_db)):

    # Get user by username
    prefix_search_input = '%' + q + '%'
    users = db.query(models.User).filter(
            models.User.username.like(prefix_search_input) 
            ).all()

    # Get station by station_name and by station_position
    stations = db.query(models.Station).filter(
            (models.Station.station_name == q) | (models.Station.station_position==q)
            ).all()

    search_results = users + stations
    
    return {'data': search_results}


