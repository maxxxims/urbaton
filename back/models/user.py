from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, UUID, TEXT
from sqlalchemy.orm import relationship, backref
from uuid import uuid4

from dependencies import Base


class User(Base):
    __tablename__ = "users"

    uuid = Column(TEXT, primary_key=True, index=True, default=lambda: str(uuid4()))
    name = Column(String, default='User')
    surname = Column(String, default='User Surname')
    email = Column(String, unique=True, index=True, default=None)
    phone_number = Column(String, unique=True, index=True, default=None)
    hashed_password = Column(String, nullable=False)
    balance = Column(Float, default=0.0)
    status  = Column(String, default='ordinary')

