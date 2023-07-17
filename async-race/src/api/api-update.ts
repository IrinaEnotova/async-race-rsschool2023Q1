import {
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
  PARAMS_WINNERS_HEADING,
  PARAMS_NUM_OF_PAGE_WINNERS,
  CARS_PER_PAGE,
} from '../utils/consts';
import createCarBlock from '../components/car-block/car-block';
import store from '../utils/store';
import { getAllCars, getCars } from './api-garage';
import { getWinners } from './api-winners';
import createWinnerRow from '../components/winner-row/winner-row';

export async function updateCarsStore(page = store.carsPage): Promise<void> {
  const { items, count } = await getCars(page);
  store.carsArray = items;
  store.carsCount = count;

  PARAMS_GARAGE_HEADING.textContent = `Garage: ${count} ${count === 1 ? 'car' : 'cars'}`;
  PARAMS_NUM_OF_PAGE.textContent = `Page #${store.carsPage}`;
  items.forEach((item) => {
    createCarBlock(item);
  });
}

export async function updateWinnersStore(page = store.winnersPage): Promise<void> {
  const { items, count } = await getWinners(page);
  store.winnersArray = items;
  store.winnersCount = count;

  PARAMS_WINNERS_HEADING.textContent = `Winners: ${count} ${count === 1 ? 'car' : 'cars'}`;
  PARAMS_NUM_OF_PAGE_WINNERS.textContent = `Page #${store.winnersPage}`;
  items.forEach((item, index) => {
    createWinnerRow(item, index);
  });
}

export async function updateState(garagePage = store.carsPage, winnersPage = store.winnersPage): Promise<void> {
  await updateCarsStore(garagePage);
  store.fullCarsArray = await getAllCars();
  store.garagePageCount = Math.ceil(store.fullCarsArray.length / CARS_PER_PAGE);
  console.log(store);
  await updateWinnersStore(winnersPage);
}
