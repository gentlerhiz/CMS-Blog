-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';
