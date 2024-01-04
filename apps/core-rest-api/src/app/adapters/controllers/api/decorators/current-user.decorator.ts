/*
  @see https://docs.nestjs.com/fundamentals/execution-context

  - Como é um decorator ele começa com a letra maiúscula
  - O decorator CurrentUser é um decorator de parâmetro de método e não de classe, por isso usamos createParamDecorator
  - O decorator CurrentUser recebe dois parâmetros:
    - O primeiro é o nome do parâmetro que queremos injetar, mas como não queremos injetar nenhum parâmetro, passamos um underscore
    - O segundo é o contexto da requisição
*/

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TokenPayload } from '../../../auth/jwt.strategy';

export const CurrentUser = createParamDecorator((_: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest(); // usamos o switchToHttp para ter acesso ao request da requisição, e getRequest() para pegar o request (o request é um objeto que tem várias informações da requisição)

  return request.user as TokenPayload;
});
