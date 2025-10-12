-- CreateTable
CREATE TABLE "Mediation" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mediation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediationDocument" (
    "id" TEXT NOT NULL,
    "mediationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediationDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MediationDocument" ADD CONSTRAINT "MediationDocument_mediationId_fkey" FOREIGN KEY ("mediationId") REFERENCES "Mediation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
