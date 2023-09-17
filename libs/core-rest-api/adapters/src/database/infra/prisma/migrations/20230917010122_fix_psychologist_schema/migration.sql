/*
  Warnings:

  - Changed the type of `role` on the `psychologists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "psychologists" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "totalYearEarnings" DROP DEFAULT,
ALTER COLUMN "totalMonthEarnings" DROP DEFAULT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
