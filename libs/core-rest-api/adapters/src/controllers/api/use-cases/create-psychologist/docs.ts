import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const description = `
---
\`Experimental\`
---

# Create a new Psychologist

This endpoint help you to create a new Psychologist.
`;

export const postMethodDocs: Partial<OperationObject> = {
  summary: 'Create a new Psychologist',
  description,
};
