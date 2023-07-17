import {
  PARAMS_WINNERS,
  PARAMS_WINNERS_HEADING,
  PARAMS_NUM_OF_PAGE_WINNERS,
  PARAMS_TABLE,
  PARAMS_THEAD,
  PARAMS_TR_THEAD,
  PARAMS_TH_ITEM,
  PARAMS_TBODY,
} from '../utils/consts';
import { createBasicElement } from '../utils/createElements';
import { updateStateWinners } from '../api/api-update';
import './winners.css';

const createWinners = async (): Promise<void> => {
  await updateStateWinners();
  createBasicElement(PARAMS_WINNERS);
  createBasicElement(PARAMS_WINNERS_HEADING);
  createBasicElement(PARAMS_NUM_OF_PAGE_WINNERS);
  createBasicElement(PARAMS_TABLE);
  createBasicElement(PARAMS_THEAD);
  createBasicElement(PARAMS_TR_THEAD);
  createBasicElement({ ...PARAMS_TH_ITEM, textContent: 'Number' });
  createBasicElement({ ...PARAMS_TH_ITEM, textContent: 'Car' });
  createBasicElement({ ...PARAMS_TH_ITEM, textContent: 'Name' });
  createBasicElement({ ...PARAMS_TH_ITEM, textContent: 'Wins' });
  createBasicElement({ ...PARAMS_TH_ITEM, textContent: 'Best time (sec)' });
  createBasicElement(PARAMS_TBODY);
  await updateStateWinners();
};

export default createWinners;
