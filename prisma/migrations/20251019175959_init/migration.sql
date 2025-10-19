-- CreateTable
CREATE TABLE "Ruling" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "summary" TEXT,
    "pdfUrl" TEXT,
    "decidedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ruling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RulingDocument" (
    "id" TEXT NOT NULL,
    "rulingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RulingDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ruling_slug_key" ON "Ruling"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ruling_caseNumber_key" ON "Ruling"("caseNumber");

-- AddForeignKey
ALTER TABLE "RulingDocument" ADD CONSTRAINT "RulingDocument_rulingId_fkey" FOREIGN KEY ("rulingId") REFERENCES "Ruling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
