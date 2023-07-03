-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MAMBER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MAMBER';
