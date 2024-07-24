-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT,
ALTER COLUMN "buyerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
