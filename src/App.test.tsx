import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

const url = 'https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe'

const server = setupServer(
  rest.get(url, (req, res, ctx) => {
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

test('handles server error', async () => {
  server.use(
    rest.get(url, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<App />);
  fireEvent.click(screen.getByText('Load movie'));
  await screen.findByRole('alert');
  expect(screen.getByRole('alert')).toHaveTextContent('Oops… something went wrong, try again 🤕');
});

test('handles 418 error', async () => {
  server.use(
    rest.get(url, (req, res, ctx) => {
      return res(ctx.status(418));
    })
  );
  render(<App />);
  fireEvent.click(screen.getByText('Load movie'));
  await screen.findByRole('alert');
  expect(screen.getByRole('alert')).toHaveTextContent(`418 I'm a tea pot 🫖, silly`);
});
