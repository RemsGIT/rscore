-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "minPlayer" INTEGER,
    "maxPlayer" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
