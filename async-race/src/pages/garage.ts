import { createBasicElement } from '../helpers/createElements';
import { PARAMS_GARAGE_WRAPPER } from '../helpers/consts';
import createForm from '../components/forms/forms';
import './garage.css';

const createGarage = (): void => {
  createBasicElement(PARAMS_GARAGE_WRAPPER);
  createForm('create');
  createForm('update');
};

export default createGarage;
