import {
  PARAMS_FORM_CREATE,
  PARAMS_INPUT_TEXT_CREATE,
  PARAMS_INPUT_COLOR_CREATE,
  PARAMS_CREATE_BUTTON,
  PARAMS_FORM_UPDATE,
  PARAMS_INPUT_TEXT_UPDATE,
  PARAMS_INPUT_COLOR_UPDATE,
  PARAMS_UPDATE_BUTTON,
} from '../../helpers/consts';
import { createBasicElement, createInputElement } from '../../helpers/createElements';
import './forms.css';

const createForm = (action: 'create' | 'update'): void => {
  switch (action) {
    case 'create':
      createBasicElement(PARAMS_FORM_CREATE);
      createInputElement(PARAMS_INPUT_TEXT_CREATE);
      createInputElement(PARAMS_INPUT_COLOR_CREATE);
      createBasicElement(PARAMS_CREATE_BUTTON);
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
