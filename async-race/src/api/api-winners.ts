import { WINNERS_PER_PAGE, WINNERS_URL } from '../utils/consts';
import { IWinner, IWinners } from '../types/interfaces';

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
