import { PARAMS_MAIN } from '../../utils/consts';
import createGarage from '../../pages/garage';
import { createBasicElement } from '../../utils/createElements';
import './main.css';

const createMain = (): void => {
  createBasicElement(PARAMS_MAIN);
  createGarage();
};

export default createMain;
