/*
  Warnings:

  - You are about to drop the column `topic` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` CHANGE `topic` `title` VARCHAR(191);
