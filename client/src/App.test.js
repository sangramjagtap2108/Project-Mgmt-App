import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ProjectMgmt text', () => {
  render(<App />);
  const linkElement = screen.getByText(/ProjectMgmt/i);
  expect(linkElement).toBeInTheDocument();
});
