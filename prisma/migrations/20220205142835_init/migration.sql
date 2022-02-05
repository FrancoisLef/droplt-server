-- CreateTable
CREATE TABLE "Torrent" (
    "torrentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "path" TEXT NOT NULL,
    "eta" DOUBLE PRECISION,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "downloaded" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "uploaded" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Torrent_pkey" PRIMARY KEY ("torrentId")
);

-- CreateTable
CREATE TABLE "TorrentFile" (
    "torrentFileId" TEXT NOT NULL,
    "torrentId" TEXT,
    "name" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "downloaded" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TorrentFile_pkey" PRIMARY KEY ("torrentFileId")
);

-- AddForeignKey
ALTER TABLE "TorrentFile" ADD CONSTRAINT "TorrentFile_torrentId_fkey" FOREIGN KEY ("torrentId") REFERENCES "Torrent"("torrentId") ON DELETE SET NULL ON UPDATE CASCADE;
