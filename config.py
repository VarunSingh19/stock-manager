from urllib.parse import quote

class Config:
    password = quote("Varunsingh@24")  
    SQLALCHEMY_DATABASE_URI = f"postgresql://postgres.xodcbschrhenyzmcmfao:{password}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
