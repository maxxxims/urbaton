from sqlalchemy.orm import Session
import sqlalchemy as sql
from dependencies import engine
import models, schemas
import pandas as pd
from geopy.distance import geodesic


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def add_user(db: Session, user: schemas.User):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    uuid = db.query(models.User.uuid).where(models.User.phone_number == user.phone_number).first()
    return uuid

