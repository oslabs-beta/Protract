import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Canvas from '../../../src/client/components/Canvas';

describe('Canvas', () => {
  beforeEach(() => {
    render(
      <Canvas
        user=""
        currComp={{
          value: 'app',
          id: 'app',
          codeStart: '<app>',
          codeEnd: '</app>',
          canEnter: true,
          children: [
            { value: 'element1', id: 'div-1', children: [] },
            { value: 'element2', id: 'div-2', children: [] },
          ],
        }}
        handleCanvasUpdate={() => {}}
        setChildren={() => {}}
      />
    );
  });

  test('renders list based on children of currComp', async () => {
    await waitFor(() => {
      const liElements = screen.getAllByRole('button');
      expect(liElements).toHaveLength(4);
    });
  });
});
