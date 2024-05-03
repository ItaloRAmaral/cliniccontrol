import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const description = `
---
\`Experimental\`
---

### Delete a  Patient in the system

This endpoint help you to Delete a  patient.
You must at least provide one of the following body parameters
`;

export const deleteMethodDocs: Partial<OperationObject> = {
  summary: 'Delete a patient',
  description,
};
