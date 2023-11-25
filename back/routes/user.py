from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_db
import database.user
from sqlalchemy.orm import Session
import schemas.user

user = APIRouter(prefix='/user', tags=['user'])

@user.get('/get_all', response_model=list[schemas.user.User])
def get_all_users(db: Session = Depends(get_db)):
    users = database.user.get_users(db)
    return users


@user.post('/reg_user')
def add_user(user: schemas.user.AddUser, db: Session = Depends(get_db)):
    uuid = database.user.add_user(db, user)
    return {'uuid': str(uuid)}