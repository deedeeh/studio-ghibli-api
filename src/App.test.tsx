import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

const server = setupServer(
  rest.get('https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe', (req, res, ctx) => {
    return res(ctx.json({title: 'Castle in the Sky'}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays movie', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('Load movie'));
  await screen.findByRole('heading');
  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.getByRole('heading')).toHaveTextContent('Castle in the Sky');
});
