-- CreateTable
CREATE TABLE "psychologists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'psychologist',
    "price" INTEGER DEFAULT 0,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "totalYearEarnings" INTEGER DEFAULT 0,
    "totalMonthEarnings" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "psychologists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_email_key" ON "psychologists"("email");
