-- CreateEnum
CREATE TYPE "Role" AS ENUM ('READER', 'WRITER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'READER';
