from sqlalchemy.orm import Session
import sqlalchemy as sql
from dependencies import engine
import models, schemas
import pandas as pd
from geopy.distance import geodesic


def get_parks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Park).offset(skip).limit(limit).all()


def add_parks(db: Session, parks: list[schemas.ParkSchema]):
    for park in parks:
        db_park = models.Park(**park)
        db.add(db_park)
    db.commit()
    db.refresh(db_park)
    return True


def get_nearest_parks(db: Session, location: schemas.Location):
    with engine.begin() as conn:
        df_parks = pd.read_sql_query(sql.select(models.Park), con=conn)
        df_parks['distance_meters'] = df_parks.apply(
            lambda row: geodesic(
                (row['latitude'], row['longitude']), (location.latitude, location.longitude)).m, axis=1
        )
        if location.skip >= len(df_parks):
            return False

        df_parks = df_parks.sort_values(by='distance_meters', ascending=True)
        df_parks = df_parks[location.skip : min(len(df_parks), location.skip + location.limit)]
        
    print(df_parks.columns)
    return df_parks.to_dict('records')