-- CreateTable
CREATE TABLE "Torrent" (
    "torrentId" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentDone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "totalSize" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Torrent_hash_key" ON "Torrent"("hash");
