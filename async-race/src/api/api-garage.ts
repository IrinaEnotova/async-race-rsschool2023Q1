import Methods from '../types/enums';
import { ICar, ICars, ICarCharacteristics } from '../types/interfaces';
import { BASE_URL, CARS_PER_PAGE, GARAGE_URL } from '../utils/consts';

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

export async function createCar(name: string, color: string): Promise<void> {
  await fetch(GARAGE_URL, {
    method: Methods.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
    }),
  });
}

export async function updateCar(name: string, color: string, id: number): Promise<void> {
  await fetch(`${GARAGE_URL}/${id}`, {
    method: Methods.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
    }),
  });
}

export async function deleteCar(id: number): Promise<void> {
  await fetch(`${GARAGE_URL}/${id}`, {
    method: Methods.DELETE,
  });
}

export async function startEngine(id: number, status: 'started' | 'stopped'): Promise<ICarCharacteristics> {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
    method: Methods.PATCH,
  });

  return response.json();
}

export async function switchCarEngine(id: number, status: 'started' | 'stopped' | 'drive'): Promise<Response> {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
    method: Methods.PATCH,
  });

  return response;
}
