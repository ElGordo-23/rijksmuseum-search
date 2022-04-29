import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { GeneralSearch } from '../generalSearch';

test('render search form', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider>
          <GeneralSearch />
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
  const formElement = screen.getByTestId('generalSearchForm');
  expect(formElement).toBeInTheDocument();
});
