import { createBasicElement, createDisabledElement } from '../utils/createElements';
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
import { IBasicElementParams, IElementDisabled } from '../types/interfaces';
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

export async function prevGaragePage(): Promise<void> {
  const carsContainer = document.querySelector('.cars-container') as HTMLElement;
  const nextBtn = document.querySelector('.btn-next') as HTMLButtonElement;
  const page = document.querySelector('.garage_page-number') as HTMLElement;
  carsContainer.innerHTML = '';
  nextBtn.disabled = false;

  const currentPage = store.carsPage - 1;
  store.carsPage -= 1;
  page.textContent = `Page #${currentPage}`;
  console.log(store.carsPage);
  await updateState(currentPage);
}

export async function nextGaragePage(): Promise<void> {
  const carsContainer = document.querySelector('.cars-container') as HTMLElement;
  const prevBtn = document.querySelector('.btn-prev') as HTMLButtonElement;
  const page = document.querySelector('.garage_page-number') as HTMLElement;
  carsContainer.innerHTML = '';
  prevBtn.disabled = false;

  const currentPage = store.carsPage + 1;
  store.carsPage += 1;
  page.textContent = `Page #${currentPage}`;
  console.log(store.carsPage);
  await updateState(currentPage);
}

const PARAMS_PREV_BTN: IElementDisabled = {
  tagName: 'button',
  classNames: ['page-item', 'btn-prev'],
  textContent: 'Prev',
  parentSelector: '.garage-pagination',
  callback: async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (store.carsPage < 3) {
      target.disabled = true;
    }

    await prevGaragePage();
  },
  disabled: true,
};

const PARAMS_NEXT_BTN: IElementDisabled = {
  tagName: 'button',
  classNames: ['page-item', 'btn-next'],
  textContent: 'Next',
  parentSelector: '.garage-pagination',
  callback: async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (store.carsPage + 1 === store.garagePageCount) {
      target.disabled = true;
    }

    await nextGaragePage();
  },
  disabled: false,
};

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
  createDisabledElement(PARAMS_PREV_BTN);
  createDisabledElement(PARAMS_NEXT_BTN);

  await updateState();
};

export default createGarage;
