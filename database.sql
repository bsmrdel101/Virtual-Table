-- Database name: virtual_table

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "new_user" BOOLEAN DEFAULT true
);

CREATE TABLE "tokens" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "map_id" INTEGER REFERENCES "maps",
    "image" TEXT,
    "size" TEXT
);

CREATE TABLE "maps" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "name" TEXT,    
    "image" TEXT
);

CREATE TABLE "map_tokens" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "map_id" INTEGER REFERENCES "maps",
    "token_id" INTEGER REFERENCES "tokens",
    "x" INTEGER,
    "y" INTEGER
);

CREATE TABLE "games_list" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "name" VARCHAR (80) NOT NULL,
    "code" VARCHAR (20) NOT NULL
);

CREATE TABLE "prev_games" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "code" VARCHAR (20)
);

CREATE TABLE "characters" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "name" VARCHAR (80) NOT NULL,
    "class" VARCHAR (80) NOT NULL,
    "race" VARCHAR (80) NOT NULL,
    "background" VARCHAR (80) NOT NULL,
    "level" INTEGER NOT NULL,
    "ac" INTEGER NOT NULL,
    "alignment" VARCHAR (80),
    "max_health" INTEGER NOT NULL,
    "current_health" INTEGER NOT NULL,
    "temp_health" INTEGER DEFAULT 0,
    "prof_bonus" INTEGER NOT NULL,
    "initiative" INTEGER,
    "inspiration" BOOLEAN DEFAULT false,
	"hit_dice" INTEGER,
	"str" INTEGER NOT NULL DEFAULT 0,
	"dex" INTEGER NOT NULL DEFAULT 0,
	"con" INTEGER NOT NULL DEFAULT 0,
	"int" INTEGER NOT NULL DEFAULT 0,
	"wis" INTEGER NOT NULL DEFAULT 0,
	"char" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "speeds" ( 
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters",
    "creature_id" INTEGER REFERENCES "creatures",
    "walk_speed" INTEGER,
    "swim_speed" INTEGER,
    "burrow_speed" INTEGER,
    "fly_speed" INTEGER,
    "hover_speed" INTEGER,
    "climb_speed" INTEGER
);

CREATE TABLE "proficiencies" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters",
    "creature_id" INTEGER REFERENCES "creatures",
    "prof_name" VARCHAR (80),
    "prof_value" INTEGER
);

CREATE TABLE "vulnerabilities" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters",
    "creature_id" INTEGER REFERENCES "creatures",
    "vul_name" VARCHAR (80)
);

CREATE TABLE "resistances" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters",
    "creature_id" INTEGER REFERENCES "creatures",
    "res_name" VARCHAR (80)
);

CREATE TABLE "immunities" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters",
    "creature_id" INTEGER REFERENCES "creatures",
    "immune_name" VARCHAR (80),
    "immune_type" VARCHAR (80)
);

CREATE TABLE "senses" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters",
    "creature_id" INTEGER REFERENCES "creatures",
    "sense_name" VARCHAR (80),
    "sense_value" INTEGER
);

CREATE TABLE "languages" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters",
    "creature_id" INTEGER REFERENCES "creatures",
    "list" TEXT
);

CREATE TABLE "creatures" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "image" TEXT,
    "name" VARCHAR (80),
    "size" VARCHAR (80),
    "type" VARCHAR (80),
    "alignment" VARCHAR (80),
    "ac" INTEGER,
    "hit_points" INTEGER,
    "hit_dice" VARCHAR (80),
    "str" INTEGER,
    "dex" INTEGER,
    "con" INTEGER,
    "int" INTEGER,
    "wis" INTEGER,
    "char" INTEGER,
    "cr" INTEGER,
    "xp" INTEGER
);

CREATE TABLE "creature_abilities" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures",
    "ability_name" VARCHAR (120),
    "ability_desc" TEXT
);

CREATE TABLE "creature_actions" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures",
    "action_name" VARCHAR (120),
    "action_desc" TEXT
);

CREATE TABLE "legendary_actions" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures",
    "leg_action_name" VARCHAR (120),
    "leg_action_desc" TEXT
);

CREATE TABLE "creature_action_rolls" (
    "id" SERIAL PRIMARY KEY,
    "action_id" INTEGER REFERENCES "creature_actions",
    "ability_id" INTEGER REFERENCES "creature_abilities",
    "leg_action_id" INTEGER REFERENCES "legendary_actions",
    "name" VARCHAR (120),
    "amount" VARCHAR (80),
    "dice_type" VARCHAR (80),
    "dmg_type" VARCHAR (80),
    "to_hit" VARCHAR (80)
);