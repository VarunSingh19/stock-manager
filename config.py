from urllib.parse import quote

class Config:
    # URL-encode the password if it has special characters
    password = quote("Varunsingh@24")  # Adjust the password with special characters here

    # Correct connection string with encoded password
    SQLALCHEMY_DATABASE_URI = f"postgresql://postgres.xodcbschrhenyzmcmfao:{password}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
