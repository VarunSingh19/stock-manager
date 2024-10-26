from urllib.parse import quote

class Config:
    password = quote("Varunsingh@24")  
    SQLALCHEMY_DATABASE_URI = f"postgresql://postgres.tbqkuipwwxyacrmwgjoa:{password}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"

    SQLALCHEMY_TRACK_MODIFICATIONS = True
# Varunsingh@24
# postgresql://postgres.agswpvhgwvqibovhfxaa:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
