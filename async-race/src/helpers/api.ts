/* eslint-disable import/no-cycle */
import { ICar, ICars } from '../types/interfaces';
import { CARS_PER_PAGE, GARAGE_URL, PARAMS_GARAGE_HEADING, PARAMS_NUM_OF_PAGE } from './consts';
import createCarBlock from '../components/car-block/car-block';
import store from './store';

export async function getCars(page: number, limit = CARS_PER_PAGE): Promise<ICars> {
  const response = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
  const cars = {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };
  return cars;
}

export async function updateCarsStore(): Promise<void> {
  const { items, count } = await getCars(store.carsPage);
  store.carsArray = items;
  store.carsCount = count;

  PARAMS_GARAGE_HEADING.textContent = `Garage: ${count} cars`;
  PARAMS_NUM_OF_PAGE.textContent = `Page #${store.carsPage}`;
  items.forEach((item) => {
    createCarBlock(item);
  });
}

export async function updateState(): Promise<void> {
  await updateCarsStore();
}

export async function getCar(id: number): Promise<ICar> {
  const response = await fetch(`${GARAGE_URL}/${id}`);
  const car = response.json();
  return car;
}
