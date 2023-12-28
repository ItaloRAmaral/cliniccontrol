-- DropForeignKey
ALTER TABLE "patient" DROP CONSTRAINT "patient_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "patient" DROP CONSTRAINT "patient_psychologist_id_fkey";

-- DropForeignKey
ALTER TABLE "patient_appointments_registry" DROP CONSTRAINT "patient_appointments_registry_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "patient_appointments_registry" DROP CONSTRAINT "patient_appointments_registry_psychologist_id_fkey";

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_appointments_registry" ADD CONSTRAINT "patient_appointments_registry_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_appointments_registry" ADD CONSTRAINT "patient_appointments_registry_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
