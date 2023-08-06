from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Union
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
        prefix="/api/search",
        tags=['Search']
        )

@router.get("", status_code=status.HTTP_200_OK, response_model=Union[List[schemas.UserOut], List[schemas.StationOut]])
def search_both_users_stations(q: str, db: Session = Depends(get_db)):

    # Get user by username
    prefix_search_input = '%' + q + '%'
    users = db.query(models.User).filter(
            models.User.username.ilike(prefix_search_input) 
            ).all()

    # Get station by station_name and by station_position
    stations = db.query(models.Station).filter(
            (models.Station.station_name.ilike(prefix_search_input)) | (models.Station.station_position.ilike(prefix_search_input))
            ).all()


    search_results = users + stations
    
    return search_results


