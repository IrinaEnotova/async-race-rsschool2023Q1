import { ICar, ICars } from '../types/interfaces';
import { CARS_PER_PAGE, GARAGE_URL } from '../utils/consts';

export async function getCars(page: number, limit = CARS_PER_PAGE): Promise<ICars> {
  const response = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
  const cars = {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };
  return cars;
}

export async function getCar(id: number): Promise<ICar> {
  const response = await fetch(`${GARAGE_URL}/${id}`);
  const car = response.json();
  return car;
}
