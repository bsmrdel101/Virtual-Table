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
    "max_health" INTEGER NOT NULL,
    "current_health" INTEGER NOT NULL,
    "temp_health" INTEGER DEFAULT 0,
    "prof_bonus" INTEGER NOT NULL,
    "movement" INTEGER,
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