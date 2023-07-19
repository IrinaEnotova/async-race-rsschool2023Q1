import {
  PARAMS_FORM_CREATE,
  PARAMS_INPUT_TEXT_CREATE,
  PARAMS_INPUT_COLOR_CREATE,
  PARAMS_FORM_UPDATE,
  PARAMS_INPUT_TEXT_UPDATE,
  PARAMS_INPUT_COLOR_UPDATE,
} from '../../utils/consts';
import {
  createBasicElement,
  createElementWithEvent,
  createDisabledElement,
  createInputElement,
} from '../../utils/createElements';
import { IEventElementParams, IElementDisabled } from '../../types/interfaces';
import { createCar, updateCar } from '../../api/api-garage';
import store from '../../utils/store';
import './forms.css';
import { updateStateGarage, updateStateWinners } from '../../api/api-update';

const PARAMS_CREATE_BUTTON: IEventElementParams = {
  tagName: 'button',
  textContent: 'Create',
  classNames: ['btn-create', 'form-btn'],
  parentSelector: '.form-create',
  callback: async (event: Event) => {
    event.preventDefault();

    const carsContainer = document.querySelector('.cars-container') as HTMLElement;
    const carsCount = document.querySelector('.garage-heading') as HTMLElement;
    const nameInput = document.querySelector('.input-text_create') as HTMLInputElement;
    const colorInput = document.querySelector('.input-color_create') as HTMLInputElement;
    const name = nameInput.value;
    const color = colorInput.value;
    carsCount.textContent = `Garage: ${store.carsCount + 1} ${store.carsCount === 1 ? 'car' : 'cars'}`;
    carsContainer.textContent = '';

    await createCar(name, color);
    await updateStateGarage();
  },
};

export const PARAMS_UPDATE_BUTTON: IElementDisabled = {
  tagName: 'button',
  textContent: 'Update',
  classNames: ['btn-update', 'form-btn'],
  parentSelector: '.form-update',
  callback: async (event: Event) => {
    event?.preventDefault();

    const target = event.target as HTMLButtonElement;
    const carsContainer = document.querySelector('.cars-container') as HTMLElement;
    const tbody = document.querySelector('.tbody') as HTMLElement;
    const nameInput = document.querySelector('.input-text_update') as HTMLInputElement;
    const colorInput = document.querySelector('.input-color_update') as HTMLInputElement;
    const name = nameInput.value;
    const color = colorInput.value;
    const { id } = store.selectedCar;

    await updateCar(name, color, id);
    nameInput.value = '';
    colorInput.value = '';
    nameInput.disabled = true;
    colorInput.disabled = true;
    target.disabled = true;
    carsContainer.textContent = '';
    await updateStateGarage();
    tbody.textContent = '';
    await updateStateWinners();
  },
  disabled: true,
};

const createForm = (action: 'create' | 'update'): void => {
  switch (action) {
    case 'create':
      createBasicElement(PARAMS_FORM_CREATE);
      createInputElement(PARAMS_INPUT_TEXT_CREATE);
      createInputElement(PARAMS_INPUT_COLOR_CREATE);
      createElementWithEvent(PARAMS_CREATE_BUTTON);
      break;
    case 'update':
      createBasicElement(PARAMS_FORM_UPDATE);
      createInputElement(PARAMS_INPUT_TEXT_UPDATE);
      createInputElement(PARAMS_INPUT_COLOR_UPDATE);
      createDisabledElement(PARAMS_UPDATE_BUTTON);
      break;
    default:
      throw new Error('Form was not created!');
  }
};

export default createForm;
