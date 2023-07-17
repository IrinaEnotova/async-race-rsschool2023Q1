import { createBasicElement } from '../utils/createElements';
import {
  PARAMS_GARAGE_WRAPPER,
  PARAMS_GARAGE,
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
  PARAMS_WINNERS_MESSAGE,
  PARAMS_CARS_CONTAINER,
  PARAMS_RACE_BTNS_CONTAINER,
  PARAMS_RACE_BTN,
  PARAMS_RESET_BTN,
  PARAMS_GARAGE_PAGINATION_WRAPPER,
} from '../utils/consts';
import createForm from '../components/forms/forms';
import { updateState } from '../api/api-update';
import { IBasicElementParams } from '../types/interfaces';
import generateRandomCars from '../utils/generateRandomCars';
import { createCar } from '../api/api-garage';
import store from '../utils/store';
import './garage.css';

const PARAMS_GENERATE_CARS: IBasicElementParams = {
  tagName: 'button',
  classNames: ['generate-btn'],
  parentSelector: '.race-btns-container',
  textContent: 'Generate cars',
  callback: () => {
    console.log('genetate cars');

    const cars = generateRandomCars();
    cars.forEach(async (car) => {
      await createCar(car.name, car.color);
    });
    window.location.reload();
  },
};

async function chooseGaragePage(num: number): Promise<void> {
  const carsContainer = document.querySelector('.cars-container') as HTMLElement;
  const page = document.querySelector('.garage_page-number') as HTMLElement;
  carsContainer.innerHTML = '';
  store.carsPage = num;
  page.textContent = `Page #${store.carsPage}`;
  await updateState(num);
}

const createGarage = async (): Promise<void> => {
  await updateState();

  createBasicElement(PARAMS_GARAGE_WRAPPER);
  createForm('create');
  createForm('update');
  createBasicElement(PARAMS_RACE_BTNS_CONTAINER);
  createBasicElement(PARAMS_RACE_BTN);
  createBasicElement(PARAMS_RESET_BTN);
  createBasicElement(PARAMS_GENERATE_CARS);

  createBasicElement(PARAMS_GARAGE);
  createBasicElement(PARAMS_GARAGE_HEADING);
  createBasicElement(PARAMS_NUM_OF_PAGE);
  createBasicElement(PARAMS_WINNERS_MESSAGE);
  createBasicElement(PARAMS_CARS_CONTAINER);

  createBasicElement(PARAMS_GARAGE_PAGINATION_WRAPPER);
  createBasicElement({
    tagName: 'li',
    classNames: ['page-item'],
    textContent: '1',
    parentSelector: '.garage-pagination',
    callback: async () => {
      await chooseGaragePage(1);
    },
  });
  createBasicElement({
    tagName: 'li',
    classNames: ['page-item'],
    textContent: '2',
    parentSelector: '.garage-pagination',
    callback: async () => {
      await chooseGaragePage(2);
    },
  });

  await updateState();
};

export default createGarage;
