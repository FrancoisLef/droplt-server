-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Torrent" (
    "torrentId" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT NOT NULL,
    "transmissionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0,
    "ratio" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "downloaded" INTEGER NOT NULL DEFAULT 0,
    "uploaded" INTEGER NOT NULL DEFAULT 0,
    "addedAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TorrentFile" (
    "torrentFileId" TEXT NOT NULL PRIMARY KEY,
    "torrentId" TEXT,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "downloaded" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TorrentFile_torrentId_fkey" FOREIGN KEY ("torrentId") REFERENCES "Torrent" ("torrentId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Torrent_hash_key" ON "Torrent"("hash");
