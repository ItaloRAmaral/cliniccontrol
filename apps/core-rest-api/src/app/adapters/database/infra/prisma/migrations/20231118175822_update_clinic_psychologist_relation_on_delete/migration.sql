-- DropForeignKey
ALTER TABLE "clinic" DROP CONSTRAINT "clinic_psychologist_id_fkey";

-- AddForeignKey
ALTER TABLE "clinic" ADD CONSTRAINT "clinic_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
