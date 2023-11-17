import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const description = `
---
\`Experimental\`
---

### Delete an existing Psychologist

This endpoint help you to delete an existing Psychologist.
You must at least provide one of the following body parameters
`;

export const patchMethodDocs: Partial<OperationObject> = {
  summary: 'Delete an existing Psychologist',
  description,
};
