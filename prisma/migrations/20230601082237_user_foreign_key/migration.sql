-- AlterTable
ALTER TABLE `Board` ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Board_userId_idx` ON `Board`(`userId`);
