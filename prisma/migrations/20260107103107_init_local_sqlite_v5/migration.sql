/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "license" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "aircrafts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "velocidad" INTEGER NOT NULL,
    "turbulence" TEXT NOT NULL,
    "combustible" REAL NOT NULL,
    "img" TEXT
);

-- CreateTable
CREATE TABLE "airports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ICAO" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "LAT" TEXT NOT NULL,
    "LON" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "flightplans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fpOrigin" TEXT NOT NULL,
    "fpDestination" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "maxAltitude" REAL NOT NULL,
    "waypoints" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "license" TEXT,
    "idAircraft" INTEGER,
    "userID" INTEGER,
    CONSTRAINT "flightplans_idAircraft_fkey" FOREIGN KEY ("idAircraft") REFERENCES "aircrafts" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "flightplans_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_key" ON "users"("user");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "aircrafts_matricula_key" ON "aircrafts"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "airports_ICAO_key" ON "airports"("ICAO");
