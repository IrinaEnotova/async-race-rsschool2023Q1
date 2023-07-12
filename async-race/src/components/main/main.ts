import { PARAMS_MAIN } from '../../helpers/consts';
import createGarage from '../../pages/garage';
import { createBasicElement } from '../../helpers/createElements';
import './main.css';

const createMain = (): void => {
  createBasicElement(PARAMS_MAIN);
  createGarage();
};

export default createMain;
