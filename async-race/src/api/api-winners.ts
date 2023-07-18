import { WINNERS_PER_PAGE, WINNERS_URL } from '../utils/consts';
import { ICar, IWinner, IWinners } from '../types/interfaces';
import Methods from '../types/enums';

export async function getWinners(page: number, limit = WINNERS_PER_PAGE): Promise<IWinners> {
  const response = await fetch(`${WINNERS_URL}?_page=${page}&_limit=${limit}`);
  const winners = {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };

  return winners;
}

export async function getWinner(id: number): Promise<IWinner> {
  const response = await fetch(`${WINNERS_URL}/${id}`);
  const winner = response.json();
  return winner;
}

export async function createWinner(id: number, wins: number, time: number): Promise<void> {
  await fetch(WINNERS_URL, {
    method: Methods.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      wins,
      time,
    }),
  });
}

export async function deleteWinner(id: number): Promise<void> {
  await fetch(`${WINNERS_URL}/${id}`, {
    method: Methods.DELETE,
  });
}

export async function updateWinner(id: number, body: { wins: number; time: number }): Promise<ICar> {
  const response = await fetch(`${WINNERS_URL}/${id}`, {
    method: Methods.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
}
