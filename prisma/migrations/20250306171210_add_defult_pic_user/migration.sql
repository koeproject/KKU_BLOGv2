/*
  Warnings:

  - Made the column `passwordHash` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePicture` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordHash" SET NOT NULL,
ALTER COLUMN "profilePicture" SET NOT NULL,
ALTER COLUMN "profilePicture" SET DEFAULT 'https://nbbje4zkz5.ufs.sh/f/bo1eRRCzWFevhWXEyIrQF41MZOTIAzkq7wfaXJj6G8csR2Vn?fbclid=IwY2xjawIzoxNleHRuA2FlbQIxMAABHb3r2eZCm9u1nliLvqVogtNQticxBCRi-aUECDUe6w1x9sxI3qZ6VdMCSw_aem_oUMGTAVHsnGUGRxA7ncwGg';
