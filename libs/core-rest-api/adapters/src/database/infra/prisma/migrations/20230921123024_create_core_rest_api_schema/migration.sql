-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PSYCHOLOGIST', 'PATIENT');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'BASIC', 'PREMIUM');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'MONEY', 'HEALTH_INSURANCE', 'OTHER');

-- CreateTable
CREATE TABLE "psychologist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PSYCHOLOGIST',
    "price" INTEGER DEFAULT 0,
    "plan" "Plan" NOT NULL DEFAULT 'BASIC',
    "total_year_earnings" INTEGER DEFAULT 0,
    "total_month_earnings" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "psychologist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "psychologist_id" TEXT NOT NULL,

    CONSTRAINT "clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'HEALTH_INSURANCE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "psychologist_id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "online" BOOLEAN NOT NULL DEFAULT false,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmation_date" TIMESTAMPTZ(6),
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "cancellation_date" TIMESTAMPTZ(6),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "missed" BOOLEAN,
    "paid" BOOLEAN DEFAULT false,
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'HEALTH_INSURANCE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patient_id" TEXT NOT NULL,
    "psychologist_id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_appointments_registry" (
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registry" JSON NOT NULL,
    "patient_id" TEXT NOT NULL,
    "psychologist_id" TEXT NOT NULL,

    CONSTRAINT "patient_appointments_registry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "psychologist_email_key" ON "psychologist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patient_email_key" ON "patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patient_cpf_key" ON "patient"("cpf");

-- AddForeignKey
ALTER TABLE "clinic" ADD CONSTRAINT "clinic_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_appointments_registry" ADD CONSTRAINT "patient_appointments_registry_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_appointments_registry" ADD CONSTRAINT "patient_appointments_registry_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
