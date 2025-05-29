CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    usermail TEXT UNIQUE,
    profile_picture TEXT,
    last_picked_hero TEXT
)