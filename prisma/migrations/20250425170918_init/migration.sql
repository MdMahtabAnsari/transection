-- CreateTable
CREATE TABLE "Refund" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "isUsingInternetBanking" BOOLEAN NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);
