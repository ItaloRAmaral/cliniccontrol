/*
  Warnings:

  - You are about to drop the `patient_appointments_registry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "patient_appointments_registry" DROP CONSTRAINT "patient_appointments_registry_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "patient_appointments_registry" DROP CONSTRAINT "patient_appointments_registry_psychologist_id_fkey";

-- DropTable
DROP TABLE "patient_appointments_registry";

-- CreateTable
CREATE TABLE "patient_appointment_registry" (
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registry" JSON NOT NULL,
    "patient_id" TEXT NOT NULL,
    "psychologist_id" TEXT NOT NULL,

    CONSTRAINT "patient_appointment_registry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "patient_appointment_registry" ADD CONSTRAINT "patient_appointment_registry_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_appointment_registry" ADD CONSTRAINT "patient_appointment_registry_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
