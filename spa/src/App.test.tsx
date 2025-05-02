import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { client } from './apollo/client';

describe('App', () => {
  it('renders vite and react logos', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const viteLogo = screen.getByAltText(/vite logo/i);
    const reactLogo = screen.getByAltText(/react logo/i);
    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });
});
