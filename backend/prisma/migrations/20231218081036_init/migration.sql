-- CreateTable
CREATE TABLE `StandingCharge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `charge` INTEGER NOT NULL,
    `monthId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StandingCharge` ADD CONSTRAINT `StandingCharge_monthId_fkey` FOREIGN KEY (`monthId`) REFERENCES `Reading`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
