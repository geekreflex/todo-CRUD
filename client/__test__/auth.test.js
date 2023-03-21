// import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('MyComponent', () => {
  test('renders a button with correct text', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Register/i });
    expect(button).toBeInTheDocument();
  });
});
