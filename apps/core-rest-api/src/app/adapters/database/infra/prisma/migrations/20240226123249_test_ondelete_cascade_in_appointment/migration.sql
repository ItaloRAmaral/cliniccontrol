-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_clinic_id_fkey";

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
