from pydantic import BaseModel



class ParkSchema(BaseModel):
    id: int
    latitude: float
    longitude: float
    photo_url: str
    adress: str
    priority: int
    description: str
    signature: str
    price: int
    is_available: bool
    is_car: bool

    class Config:
        orm_mode = True


class ResponseNearestPark(ParkSchema):
    distance_meters: float




