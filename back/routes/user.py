from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_db
import database.user
from sqlalchemy.orm import Session
import schemas.user
from uuid import UUID

user = APIRouter(prefix='/user', tags=['user'])

@user.get('/get_all', response_model=list[schemas.user.User])
def get_all_users(db: Session = Depends(get_db)):
    users = database.user.get_users(db)
    return users


@user.put('/reg_user')
def add_user(user: schemas.user.AddUser, db: Session = Depends(get_db)):
    is_exist = database.user.check_phone_number_in_table(db, user.phone_number)
    if is_exist:
        raise HTTPException(status_code=400, detail="User with this phone number already exists")
    else:
        uuid = database.user.add_user(db, user)
    return {'uuid': str(uuid[0])}


@user.delete('/delete_user')
def delete_user(uuid: UUID, db: Session = Depends(get_db)):
    is_exist = database.user.check_uuid_in_table(db, uuid)
    if not is_exist:
        raise HTTPException(status_code=400, detail="User with this uuid does not exist")
    else:
        database.user.delete_user(db, uuid)
        return {'msg': 'ok'}
    

@user.post('/get_balance')
def get_balance(uuid: UUID, db: Session = Depends(get_db)):
    is_exist = database.user.check_uuid_in_table(db, uuid)
    if not is_exist:
        raise HTTPException(status_code=400, detail="User with this uuid does not exist")
    else:
        balance = database.user.get_balance(db, uuid)
        return {'balance': balance}
    

@user.put('/change_balance')
def update_balance(uuid: UUID, delta: float, db: Session = Depends(get_db)):
    is_exist = database.user.check_uuid_in_table(db, uuid)
    if not is_exist:
        raise HTTPException(status_code=400, detail="User with this uuid does not exist")
    
    balance = database.user.get_balance(db, uuid)
    if balance + delta < 0:
        raise HTTPException(status_code=400, detail="Not enough money")
    
    new_balance = database.user.update_balance(db, uuid, delta)
    return {'new_balance': new_balance}