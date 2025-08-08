/*
  Warnings:

  - You are about to drop the column `pw` on the `Reservation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todoID" TEXT NOT NULL,
    "todoContent" TEXT NOT NULL,
    "edit" BOOLEAN NOT NULL DEFAULT false,
    "person" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "finishTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Reservation" ("createdAt", "edit", "finishTime", "id", "person", "rooms", "startTime", "todoContent", "todoID", "updatedAt") SELECT "createdAt", "edit", "finishTime", "id", "person", "rooms", "startTime", "todoContent", "todoID", "updatedAt" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
