import { createBasicElement } from '../helpers/createElements';
import { PARAMS_GARAGE_WRAPPER, PARAMS_GARAGE, PARAMS_GARAGE_HEADING, PARAMS_NUM_OF_PAGE } from '../helpers/consts';
import createForm from '../components/forms/forms';
import { updateState } from '../helpers/api';
import './garage.css';

const createGarage = async (): Promise<void> => {
  await updateState();

  createBasicElement(PARAMS_GARAGE_WRAPPER);
  createForm('create');
  createForm('update');

  createBasicElement(PARAMS_GARAGE);
  createBasicElement(PARAMS_GARAGE_HEADING);
  createBasicElement(PARAMS_NUM_OF_PAGE);

  await updateState();
};

export default createGarage;
