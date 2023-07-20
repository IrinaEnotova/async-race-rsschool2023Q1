import {
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
  PARAMS_WINNERS_HEADING,
  PARAMS_NUM_OF_PAGE_WINNERS,
  CARS_PER_PAGE,
  WINNERS_PER_PAGE,
} from '../utils/consts';
// eslint-disable-next-line import/no-cycle
import createCarBlock from '../components/car-block/car-block';
import store from '../utils/store';
import { getAllCars, getCars } from './api-garage';
import { getWinners, getAllWinners } from './api-winners';
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

export async function updateWinnersStore(
  page = store.winnersPage,
  limit = WINNERS_PER_PAGE,
  sort = 'time',
  order = 'asc',
): Promise<void> {
  const { items, count } = await getWinners(page, limit, sort, order);
  store.winnersArray = items;
  store.winnersCount = count;

  PARAMS_WINNERS_HEADING.textContent = `Winners: ${count} ${count === 1 ? 'car' : 'cars'}`;
  PARAMS_NUM_OF_PAGE_WINNERS.textContent = `Page #${store.winnersPage}`;

  items.forEach((item, index) => {
    createWinnerRow(item, index);
  });
}

export async function updateStateGarage(garagePage = store.carsPage): Promise<void> {
  await updateCarsStore(garagePage);
  store.fullCarsArray = await getAllCars();
  store.garagePageCount = Math.ceil(store.fullCarsArray.length / CARS_PER_PAGE);

  setTimeout(() => {
    const garagePagination = document.querySelector('.garage-pagination') as HTMLElement;
    if (store.fullCarsArray.length < 8) {
      garagePagination.classList.add('hidden-pagination');
    } else {
      garagePagination.classList.remove('hidden-pagination');
    }
  }, 10);
}

export async function updateStateWinners(
  winnersPage = store.winnersPage,
  limit = WINNERS_PER_PAGE,
  sort = 'time',
  order = 'asc',
): Promise<void> {
  await updateWinnersStore(winnersPage, limit, sort, order);

  store.fullWinnersArray = await getAllWinners();
  store.winnersPageCount = Math.ceil(store.fullWinnersArray.length / WINNERS_PER_PAGE);

  setTimeout(() => {
    const winnerPagination = document.querySelector('.winners-pagination') as HTMLElement;
    if (store.fullWinnersArray.length < 11) {
      winnerPagination.classList.add('hidden-pagination');
    } else {
      winnerPagination.classList.remove('hidden-pagination');
    }
  }, 10);
}
