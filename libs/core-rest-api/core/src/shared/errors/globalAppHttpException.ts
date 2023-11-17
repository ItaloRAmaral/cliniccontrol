import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ValidationException } from './validation-exception';

const className = 'GlobalAppHttpException';

export class GlobalAppHttpException {
  constructor(error: unknown, message?: string, status?: HttpStatus) {
    this.bubbleUpHttpException(error, message, status);
    this.bubbleUpValidationException(error, message, status);
    this.bubbleUpPrismaException(error);
  }

  bubbleUpHttpException(error: unknown, message?: string, status?: HttpStatus) {
    /**
     * Use type guard
     *
     * @see https://youtu.be/xdQkEn3mx1k?t=114
     */
    if (error instanceof HttpException) {
      const exceptionMessage = message || error.message;
      const exceptionStatus = status || error.getStatus();
      Logger.warn(exceptionMessage);
      throw new HttpException(exceptionMessage, exceptionStatus, {
        cause: error,
      });
    }
  }

  bubbleUpValidationException(error: unknown, message?: string, status?: HttpStatus) {
    const exceptionMessage = message || 'Validation failed';
    if (error instanceof ValidationException) {
      Logger.warn(exceptionMessage + JSON.stringify(error.causes), className);
      throw new HttpException(
        {
          message: exceptionMessage,
          causes: error.causes,
        },
        status || 400
      );
    }
  }

  bubbleUpPrismaException(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      let exceptionMessage = 'An error occurred while processing your request.';
      let exceptionStatus = HttpStatus.INTERNAL_SERVER_ERROR; // ou outro status HTTP apropriado

      // Adicionando detalhes específicos do erro Prisma
      exceptionMessage += ` Details: ${error.message}`;

      // Incluindo código de erro do Prisma para identificação específica
      if (error.code) {
        exceptionMessage += ` Prisma Error Code: ${error.code}.`;
      }

      if (error.code === 'P2002' || error.code === 'P2003') {
        // Remover linhas e espaços extras
        const relevantLines = error.message
          .split('\n')
          .filter((line) => line.trim() !== '')
          .map((line) => line.trim())
          .join(' ');

        console.log('relevant lines', relevantLines);
        exceptionMessage = relevantLines;
        exceptionStatus = HttpStatus.BAD_REQUEST;
      }

      throw new HttpException(exceptionMessage, exceptionStatus);
    }
  }
}
