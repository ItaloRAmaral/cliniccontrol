-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_psychologist_id_fkey";

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
