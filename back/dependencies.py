from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def load_env():
    is_load = load_dotenv('.env')
    if is_load:
        return {
            'HOST': os.getenv('BACKEND_HOST'),
            'PORT': int(os.getenv('BACKEND_PORT')),
            'SQLALCHEMY_DATABASE_URL': os.getenv('SQLALCHEMY_DATABASE_URL'),
            'PATH_TO_PARKS': os.getenv('PATH_TO_PARKS')
        }
    else:
        raise Exception('Failed to load .env file')
    

CONFIG = load_env()

engine = create_engine(CONFIG.get('SQLALCHEMY_DATABASE_URL'), )#connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
metadata = MetaData()




