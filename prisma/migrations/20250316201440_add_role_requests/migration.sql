-- CreateEnum
CREATE TYPE "RoleRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "RoleRequest" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "RoleRequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "RoleRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoleRequest" ADD CONSTRAINT "RoleRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
