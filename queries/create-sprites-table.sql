CREATE TABLE IF NOT EXISTS sprites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hero_id INTEGER,
  profile_picture TEXT,
  idle_sprite TEXT,
  attack_sprite TEXT,
  defense_sprite TEXT,
  damage_received_sprite TEXT,
  celebration_sprite TEXT)