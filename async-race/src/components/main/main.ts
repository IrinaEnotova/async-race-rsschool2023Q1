import { PARAMS_MAIN } from '../../utils/consts';
import createGarage from '../../pages/garage';
import { createBasicElement } from '../../utils/createElements';
import './main.css';
import createWinners from '../../pages/winners';

const createMain = async (): Promise<void> => {
  createBasicElement(PARAMS_MAIN);
  await createGarage();
  await createWinners();
};

export default createMain;
