from pydantic import BaseModel


class Location(BaseModel):
    latitude: float
    longitude: float
    
    skip: int = 0
    limit: int = 5