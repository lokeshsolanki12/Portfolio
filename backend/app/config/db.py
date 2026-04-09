import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="postgres",
        user="postgres",
        password="Solanki@2006",
        port="5432"
    )
    return conn