import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './pages/Main';

test('renders learn react link', () => {
  render(<Main />);
  const linkElement = screen.getByText(/Main/i);
  expect(linkElement).toBeDefined();
});
