/*
  Warnings:

  - Added the required column `plotNo` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `farmer` ADD COLUMN `plotNo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `paymentType` VARCHAR(191) NOT NULL;
