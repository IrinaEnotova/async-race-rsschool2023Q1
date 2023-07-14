import { IStore } from '../types/interfaces';

const store: IStore = {
  carsPage: 1,
  carsArray: [],
  carsCount: 0,
  selectedCarIndex: -1,
  selectedCar: { name: 'none', color: '#000000', id: 0 },
  winnersPage: 1,
  winnersArray: [],
  winnersCount: 0,
  currentPage: 'garage',
};

export default store;
