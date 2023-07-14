import {
  PARAMS_FORM_CREATE,
  PARAMS_INPUT_TEXT_CREATE,
  PARAMS_INPUT_COLOR_CREATE,
  PARAMS_FORM_UPDATE,
  PARAMS_INPUT_TEXT_UPDATE,
  PARAMS_INPUT_COLOR_UPDATE,
  PARAMS_UPDATE_BUTTON,
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
} from '../../utils/consts';
import { createBasicElement, createElementWithEvent, createInputElement } from '../../utils/createElements';
import { IEventElementParams } from '../../types/interfaces';
import { createCar } from '../../api/api-garage';
import { updateState } from '../../api/api-update';
import store from '../../utils/store';
import './forms.css';

function clearDataOnPage(): void {
  const garage = document.querySelector('.garage');
  const winners = document.querySelector('winners-wrapper');
  if (garage) {
    garage.innerHTML = '';
  }
  if (winners) {
    winners.innerHTML = '';
  }
}

async function updateDataOnPage(): Promise<void> {
  store.carsCount += 1;
  PARAMS_GARAGE_HEADING.textContent = `Garage: ${store.carsCount} cars`;
  createBasicElement(PARAMS_GARAGE_HEADING);
  createBasicElement(PARAMS_NUM_OF_PAGE);
  await updateState();
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
    await updateDataOnPage();
  },
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
      createBasicElement(PARAMS_UPDATE_BUTTON);
      break;
    default:
      throw new Error('Form was not created!');
  }
};

export default createForm;
