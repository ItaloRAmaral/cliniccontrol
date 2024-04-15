import { IsObject, IsString } from 'class-validator';
import { PsychologistEntity } from '../../../../../../core/domains/psychologist/entities/psychologist/entity';

class UpdatePsychologistInfoOutputDto extends PsychologistEntity {}

export class UpdatePsychologistControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject({ each: true })
  updatedPsychologist!: UpdatePsychologistInfoOutputDto;
}
