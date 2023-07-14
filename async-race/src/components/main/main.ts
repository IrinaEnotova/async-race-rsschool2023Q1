import { PARAMS_MAIN } from '../../utils/consts';
import createGarage from '../../pages/garage';
import { createBasicElement } from '../../utils/createElements';
import './main.css';
import createWinners from '../../pages/winners';

const createMain = (): void => {
  createBasicElement(PARAMS_MAIN);
  createGarage();
  createWinners();
};

export default createMain;
