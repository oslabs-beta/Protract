import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

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
      const ul = screen.getByRole('list');
      expect(ul).toBeInTheDocument();
      expect(ul.children.length).toBe(2);
      expect(ul.children[0]).toHaveTextContent('element1');
      expect(ul.children[1]).toHaveTextContent('element2');
    });
  });
});
