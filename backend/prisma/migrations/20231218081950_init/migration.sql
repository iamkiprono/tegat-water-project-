/*
  Warnings:

  - A unique constraint covering the columns `[month]` on the table `Reading` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `standingcharge` DROP FOREIGN KEY `StandingCharge_monthId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Reading_month_key` ON `Reading`(`month`);

-- AddForeignKey
ALTER TABLE `StandingCharge` ADD CONSTRAINT `StandingCharge_monthId_fkey` FOREIGN KEY (`monthId`) REFERENCES `Reading`(`month`) ON DELETE RESTRICT ON UPDATE CASCADE;
