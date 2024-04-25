import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../shared/errors/globalAppHttpException';
import { DeleteClinicControllerParamsInputDto } from './input.dto';
import { NestjsDeleteClinicService } from './nestjs-delete-clinic.service';
import { DeleteClinicControllerOutputDto } from './output.dto';

@ApiTags('Clinic')
@Controller({
  path: 'clinic',
})
export class DeleteClinicController {
  constructor(private deleteClinicService: NestjsDeleteClinicService) {}

  @Delete(':id/delete')
  async execute(
    @Param() { id }: DeleteClinicControllerParamsInputDto,
  ): Promise<DeleteClinicControllerOutputDto> {
    try {
      await this.deleteClinicService.execute(id);

      return {
        message: 'Clinic deleted successfully',
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
