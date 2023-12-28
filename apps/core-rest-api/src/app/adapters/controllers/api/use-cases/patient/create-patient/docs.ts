import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const description = `
---
\`Experimental\`
---

### Create a new Patient in the system

This endpoint help you to create a new patient.
You must at least provide one of the following body parameters
`;

export const postMethodDocs: Partial<OperationObject> = {
  summary: 'Create a new patient',
  description,
};
