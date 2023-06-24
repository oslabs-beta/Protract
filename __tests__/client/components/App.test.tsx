import React from 'react';
import { render } from '@testing-library/react';

import App from '../../../src/client/App';

describe('app', () => {
  test('renders without errors', () => {
    render(<App />);
  });
});
