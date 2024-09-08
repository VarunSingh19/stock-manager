import os

class Config:
    SQLALCHEMY_DATABASE_URI ='postgresql://postgres:123456@localhost:5433/stocks_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
