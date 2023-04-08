/*
  Warnings:

  - Added the required column `authorId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratingCount` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratingScore` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalDetails` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ratingCount" INTEGER NOT NULL,
ADD COLUMN     "ratingScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "technicalDetails" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
