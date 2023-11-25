from pydantic import BaseModel
from uuid import uuid4, UUID
from typing import Union


class _User(BaseModel):
    name: str    = 'Default User'
    surname: str = 'Default User Surname'
    email: Union[str, None] = None
    phone_number: str
    status: str


class AddUser(_User):
    hashed_password: str
    

class User(AddUser):
    uuid: UUID
    balance: float

    class Config:
        orm_mode = True