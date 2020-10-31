import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {getHero} from './api';
import { act } from 'react-dom/test-utils';

jest.mock('./api');

const SAITAMA = {
  name: "Saitama",
  age: 25,
  height: 175
}

//@ts-ignore
getHero.mockResolvedValue(SAITAMA);

describe('App', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should have label "Search" & Element input & button ', () => {
    render(<App />);
    screen.getByLabelText(/search/i);
    screen.getByRole('button', {name: /submit/i})
  });

  it('Should call api when user submit on button ', async () => {
    render(<App />);

    userEvent.type(screen.getByLabelText(/search/i), 'saitama');
    userEvent.click(screen.getByRole('button', {name: /submit/i}));

    expect(getHero).toHaveBeenCalledWith('saitama');
  });

  it('When Call Api Should Display Loading in Dom', async () => {
    render(<App />);

    userEvent.type(screen.getByLabelText(/search/i), 'saitama');
    userEvent.click(screen.getByRole('button', {name: /submit/i}));

    expect(getHero).toHaveBeenCalledWith('saitama');
    screen.getByText(/loading/i)
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
  })

  it('When Call api success. Loading should get out', async () => {
    render(<App />);

    userEvent.type(screen.getByLabelText(/search/i), 'saitama');
    userEvent.click(screen.getByRole('button', {name: /submit/i}));

    expect(getHero).toHaveBeenCalledWith('saitama');
    screen.getByText(/loading/i)
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
  });

  it('When api call success. have to display detail hero', async () => {
    render(<App />);
    
    userEvent.type(screen.getByLabelText(/search/i), 'saitama');
    userEvent.click(screen.getByRole('button', {name: /submit/i}))
    expect(getHero).toHaveBeenCalledWith('saitama');
    screen.getByText(/loading/i)
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
  })
})
