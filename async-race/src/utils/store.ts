import { IStore } from '../types/interfaces';

const store: IStore = {
  carsPage: 1,
  garagePageCount: 1,
  carsArray: [],
  fullCarsArray: [],
  carsCount: 0,
  selectedCarIndex: -1,
  selectedCar: { name: 'none', color: '#000000', id: 0 },
  winnersPage: 1,
  winnersPageCount: 1,
  winnersArray: [],
  fullWinnersArray: [],
  winnersCount: 0,
  currentPage: 'garage',
};

export default store;
