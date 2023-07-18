import { createBasicElement, createDisabledElement } from '../utils/createElements';
import {
  PARAMS_GARAGE_WRAPPER,
  PARAMS_GARAGE,
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
  PARAMS_WINNERS_MESSAGE,
  PARAMS_CARS_CONTAINER,
  PARAMS_RACE_BTNS_CONTAINER,
  PARAMS_GARAGE_PAGINATION_WRAPPER,
} from '../utils/consts';
import createForm from '../components/forms/forms';
import { updateStateGarage } from '../api/api-update';
import { IBasicElementParams, IElementDisabled } from '../types/interfaces';
import generateRandomCars from '../utils/generateRandomCars';
import { createCar, startEngine, switchCarEngine } from '../api/api-garage';
import { animateCar, requestIds } from '../utils/animateCar';
import store from '../utils/store';
import './garage.css';

const PARAMS_RACE_BTN: IBasicElementParams = {
  tagName: 'button',
  classNames: ['race-btn'],
  parentSelector: '.race-btns-container',
  textContent: 'Race',
  callback: async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    const resetBtn = document.querySelector('.reset-btn') as HTMLButtonElement;
    const dataCars = store.carsArray;
    target.disabled = true;
    resetBtn.disabled = false;

    dataCars.forEach(async (car) => {
      const { velocity, distance } = await startEngine(car.id, 'started');
      const duration = distance / velocity;
      animateCar(car.id, duration);
    });
  },
};

const PARAMS_RESET_BTN: IBasicElementParams = {
  tagName: 'button',
  classNames: ['reset-btn'],
  parentSelector: '.race-btns-container',
  textContent: 'Reset',
  callback: async (event: Event) => {
    console.log('reset race');

    const target = event.target as HTMLButtonElement;
    const raceBtn = document.querySelector('.race-btn') as HTMLButtonElement;
    const dataCars = store.carsArray;
    const carBlocks = document.querySelectorAll('.car-block');
    target.disabled = true;
    raceBtn.disabled = false;
    dataCars.forEach(async (car) => {
      await switchCarEngine(car.id, 'stopped');
      cancelAnimationFrame(Number(requestIds[`${car.id}`]));
      carBlocks.forEach((carBlock) => {
        const carMessage = carBlock.childNodes[0].childNodes[1];
        carMessage.textContent = '';
        const carImg = carBlock.childNodes[2] as HTMLElement;
        carImg.style.transform = `translateX(0px)`;
      });
    });
  },
};

const PARAMS_GENERATE_CARS: IBasicElementParams = {
  tagName: 'button',
  classNames: ['generate-btn'],
  parentSelector: '.race-btns-container',
  textContent: 'Generate cars',
  callback: () => {
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
  await updateStateGarage(currentPage);
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
  await updateStateGarage(currentPage);
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
  await updateStateGarage();

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

  await updateStateGarage();
};

export default createGarage;
