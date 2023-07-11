import {
  PARAMS_BTN_GARAGE,
  PARAMS_BTN_WINNERS,
  PARAMS_HEADER,
  PARAMS_HEADER_BTNS,
  PARAMS_HEADING,
} from '../helpers/consts';
import { createBasicElement } from '../helpers/createElements';
import './header.css';

const createHeader = (): void => {
  createBasicElement(PARAMS_HEADER);
  createBasicElement(PARAMS_HEADER_BTNS);
  createBasicElement(PARAMS_BTN_GARAGE);
  createBasicElement(PARAMS_BTN_WINNERS);
  createBasicElement(PARAMS_HEADING);
};

export default createHeader;
