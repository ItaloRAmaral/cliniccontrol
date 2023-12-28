import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const description = `
---
\`Experimental\`
---

### Delete an existing Psychologist

This endpoint help you to delete an existing Psychologist. \n
You must provide as route params an \`id\` of the Psychologist you want to delete.
`;

export const patchMethodDocs: Partial<OperationObject> = {
  summary: 'Delete an existing Psychologist',
  description,
};
