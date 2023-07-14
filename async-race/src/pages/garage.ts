import { createBasicElement } from '../utils/createElements';
import {
  PARAMS_GARAGE_WRAPPER,
  PARAMS_GARAGE,
  PARAMS_GARAGE_HEADING,
  PARAMS_NUM_OF_PAGE,
  PARAMS_RACE_BTNS_CONTAINER,
  PARAMS_RACE_BTN,
  PARAMS_RESET_BTN,
  PARAMS_GENERATE_CARS,
} from '../utils/consts';
import createForm from '../components/forms/forms';
import { updateState } from '../api/api';
import './garage.css';

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

  await updateState();
};

export default createGarage;
