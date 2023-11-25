from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship, backref

from dependencies import Base


class Park(Base):
    __tablename__ = "parks"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float, index=True, nullable=False)
    longitude = Column(Float, index=True, nullable=False)

    photo_url = Column(String, index=True, default='Default Photo')
    adress = Column(String, index=True, default='Default Adress')
    
    description = Column(String, default=None)
    signature = Column(String, default=None)

    priority = Column(Integer, default=0)
    price = Column(Integer, default=999)

    is_available = Column(Boolean, default=True)
    is_car = Column(Boolean, default=False)

