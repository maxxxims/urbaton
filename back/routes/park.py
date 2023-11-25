from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_db
import database.park
from sqlalchemy.orm import Session
from schemas import Location, ParkSchema, ResponseNearestPark


park = APIRouter(prefix='/park')


@park.get('/get_all')
def get_all_parks(db: Session = Depends(get_db)):
    parks = database.park.get_parks(db)
    return parks


@park.post('/get_nearest', response_model=list[ResponseNearestPark])
def get_nearest_parks(location: Location, db: Session = Depends(get_db)):
    parks = database.park.get_nearest_parks(db, location)
    # print(parks, len(parks))
    if park:
        return parks
    else:
        return HTTPException(status_code=401, detail="Too much skip")
