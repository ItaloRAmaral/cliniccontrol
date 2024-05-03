import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const description = `
---
\`Experimental\`
---

### Update an existing Psychologist

This endpoint help you to update an existing Psychologist.
You must at least provide one of the following body parameters
`;

export const patchMethodDocs: Partial<OperationObject> = {
  summary: 'Update an existing Psychologist',
  description,
};
