-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'Draft',
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePicture" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'Member';
