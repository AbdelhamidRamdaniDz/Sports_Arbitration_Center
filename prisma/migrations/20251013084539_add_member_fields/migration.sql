-- CreateEnum
CREATE TYPE "Role" AS ENUM ('arbitrator', 'lawyer');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "certifications" TEXT[],
ADD COLUMN     "city" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "Role",
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
