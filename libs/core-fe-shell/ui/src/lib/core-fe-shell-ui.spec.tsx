import { render } from '@testing-library/react';

import CoreFeShellUi from './core-fe-shell-ui';

describe('CoreFeShellUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoreFeShellUi />);
    expect(baseElement).toBeTruthy();
  });
});
