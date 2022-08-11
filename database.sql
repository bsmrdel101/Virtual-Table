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
    "image" TEXT,
    "size" INTEGER
);