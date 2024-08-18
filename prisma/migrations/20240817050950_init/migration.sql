-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "number_phone" VARCHAR(255) NOT NULL,
    "authorId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
