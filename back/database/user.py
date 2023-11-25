from sqlalchemy.orm import Session
import sqlalchemy as sql
from dependencies import engine
import models, schemas
import pandas as pd
from geopy.distance import geodesic
from uuid import UUID


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def check_phone_number_in_table(db: Session, phone_number: str):
    return db.query(models.User).filter_by(phone_number=phone_number).first() is not None


def check_uuid_in_table(db: Session, uuid: UUID):
    return db.query(models.User).filter_by(uuid=str(uuid)).first() is not None


def delete_user(db: Session, uuid: UUID):
    db_user = db.query(models.User).filter_by(uuid=str(uuid)).one()
    db.delete(db_user)
    db.commit()


def add_user(db: Session, user: schemas.User):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    uuid = db.query(models.User.uuid).where(models.User.phone_number == user.phone_number).first()
    return uuid


def get_balance(db: Session, uuid: UUID):
    db_user = db.query(models.User).filter_by(uuid=str(uuid)).one()
    return db_user.balance


def update_balance(db: Session, uuid: UUID, balance: float) -> float:
    db_user = db.query(models.User).filter_by(uuid=str(uuid)).one()
    db_user.balance += balance
    new_balance = db_user.balance
    db.commit()
    db.refresh(db_user)
    return new_balance