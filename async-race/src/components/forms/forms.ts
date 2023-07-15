import {
  PARAMS_FORM_CREATE,
  PARAMS_INPUT_TEXT_CREATE,
  PARAMS_INPUT_COLOR_CREATE,
  PARAMS_FORM_UPDATE,
  PARAMS_INPUT_TEXT_UPDATE,
  PARAMS_INPUT_COLOR_UPDATE,
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
} from '../../utils/consts';
import {
  createBasicElement,
  createElementWithEvent,
  createDisabledElement,
  createInputElement,
} from '../../utils/createElements';
import { IEventElementParams, IElementDisabled } from '../../types/interfaces';
import { createCar, updateCar } from '../../api/api-garage';
import { updateState } from '../../api/api-update';
import store from '../../utils/store';
import './forms.css';

function clearDataOnPage(): void {
  const garage = document.querySelector('.garage');
  const winners = document.querySelector('.tbody');
  const nameInput = document.querySelector('.input-text_create') as HTMLInputElement;
  const colorInput = document.querySelector('.input-color_create') as HTMLInputElement;
  nameInput.value = '';
  colorInput.value = '#000000';

  if (garage) {
    garage.innerHTML = '';
  }
  if (winners) {
    winners.innerHTML = '';
  }
}

async function updateDataAfterCreation(): Promise<void> {
  store.carsCount += 1;
  PARAMS_GARAGE_HEADING.textContent = `Garage: ${store.carsCount} cars`;
  createBasicElement(PARAMS_GARAGE_HEADING);
  createBasicElement(PARAMS_NUM_OF_PAGE);
  await updateState();
}

async function updateDataAfterUpdate(): Promise<void> {
  createBasicElement(PARAMS_GARAGE_HEADING);
  createBasicElement(PARAMS_NUM_OF_PAGE);
  await updateState();
}

function clearDataAfterUpdate(): void {
  const nameInput = document.querySelector('.input-text_update') as HTMLInputElement;
  const colorInput = document.querySelector('.input-color_update') as HTMLInputElement;
  const updateBtn = document.querySelector('.btn-update') as HTMLButtonElement;

  nameInput.value = '';
  colorInput.value = '#000000';

  nameInput.disabled = true;
  colorInput.disabled = true;
  updateBtn.disabled = true;

  store.selectedCarIndex = -1;
  store.selectedCar = { name: 'none', color: '#000000', id: 0 };
}

const PARAMS_CREATE_BUTTON: IEventElementParams = {
  tagName: 'button',
  textContent: 'Create',
  classNames: ['btn-create', 'form-btn'],
  parentSelector: '.form-create',
  callback: async (event: Event) => {
    event.preventDefault();

    const nameInput = document.querySelector('.input-text_create') as HTMLInputElement;
    const colorInput = document.querySelector('.input-color_create') as HTMLInputElement;
    const name = nameInput.value;
    const color = colorInput.value;

    createCar(name, color);
    clearDataOnPage();
    setTimeout(async () => {
      await updateDataAfterCreation();
    }, 100);
  },
};

export const PARAMS_UPDATE_BUTTON: IElementDisabled = {
  tagName: 'button',
  textContent: 'Update',
  classNames: ['btn-update', 'form-btn'],
  parentSelector: '.form-update',
  callback: async (event: Event) => {
    event?.preventDefault();

    const nameInput = document.querySelector('.input-text_update') as HTMLInputElement;
    const colorInput = document.querySelector('.input-color_update') as HTMLInputElement;
    const name = nameInput.value;
    const color = colorInput.value;
    const { id } = store.selectedCar;

    updateCar(name, color, id);
    clearDataAfterUpdate();
    clearDataOnPage();
    setTimeout(async () => {
      await updateDataAfterUpdate();
    }, 100);
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
