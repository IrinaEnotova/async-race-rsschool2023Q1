import {
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
  PARAMS_WINNERS_HEADING,
  PARAMS_NUM_OF_PAGE_WINNERS,
} from '../utils/consts';
import createCarBlock from '../components/car-block/car-block';
import store from '../utils/store';
import { getCars } from './api-garage';
import { getWinners } from './api-winners';
import createWinnerRow from '../components/winner-row/winner-row';

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

export async function updateWinnersStore(): Promise<void> {
  const { items, count } = await getWinners(store.winnersPage);
  store.winnersArray = items;
  store.winnersCount = count;

  PARAMS_WINNERS_HEADING.textContent = `Winners: ${count} cars`;
  PARAMS_NUM_OF_PAGE_WINNERS.textContent = `Page #${store.winnersPage}`;
  items.forEach((item, index) => {
    createWinnerRow(item, index);
  });
}

export async function updateState(): Promise<void> {
  await updateCarsStore();
  await updateWinnersStore();
}
