/*
  Warnings:

  - Added the required column `authorId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "authorId" INTEGER NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
