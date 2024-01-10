/*
  Warnings:

  - You are about to drop the `standingcharge` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `standingCharge` to the `Reading` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `standingcharge` DROP FOREIGN KEY `StandingCharge_monthId_fkey`;

-- DropIndex
DROP INDEX `Reading_month_key` ON `reading`;

-- AlterTable
ALTER TABLE `reading` ADD COLUMN `standingCharge` INTEGER NOT NULL;

-- DropTable
DROP TABLE `standingcharge`;
