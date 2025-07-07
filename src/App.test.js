import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello text', () => {
  render(<App />);
  const helloElement = screen.getByText(/hello/i);
  expect(helloElement).toBeInTheDocument();
});
