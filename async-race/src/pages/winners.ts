import {
  PARAMS_WINNERS,
  PARAMS_WINNERS_HEADING,
  PARAMS_NUM_OF_PAGE_WINNERS,
  PARAMS_TABLE,
  PARAMS_THEAD,
  PARAMS_TR_THEAD,
  PARAMS_TH_ITEM,
  PARAMS_TBODY,
  PARAMS_WINNERS_PAGINATION_WRAPPER,
} from '../utils/consts';
import { createBasicElement, createDisabledElement } from '../utils/createElements';
import { updateStateWinners } from '../api/api-update';
import store from '../utils/store';
import { IElementDisabled } from '../types/interfaces';
import './winners.css';

async function prevWinnersPage(): Promise<void> {
  const winnersContainer = document.querySelector('.tbody') as HTMLElement;
  const nextBtn = document.querySelector('.btn-next') as HTMLButtonElement;
  const page = document.querySelector('.winners_page-number') as HTMLElement;
  winnersContainer.innerHTML = '';
  nextBtn.disabled = false;

  const currentPage = store.winnersPage - 1;
  store.winnersPage -= 1;
  page.textContent = `Page #${currentPage}`;
  console.log(store.winnersPage);
  await updateStateWinners(currentPage);
}

async function nextWinnersPage(): Promise<void> {
  const winnersContainer = document.querySelector('.tbody') as HTMLElement;
  const prevBtn = document.querySelector('.btn-prev') as HTMLButtonElement;
  const page = document.querySelector('.winners_page-number') as HTMLElement;
  winnersContainer.innerHTML = '';
  prevBtn.disabled = false;

  const currentPage = store.winnersPage + 1;
  store.winnersPage += 1;
  page.textContent = `Page #${currentPage}`;
  console.log(store.winnersPage);
  await updateStateWinners(currentPage);
}

const PARAMS_PREV_BTN: IElementDisabled = {
  tagName: 'button',
  classNames: ['page-item', 'btn-prev'],
  textContent: 'Prev',
  parentSelector: '.winners-pagination',
  callback: async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (store.winnersPage < 3) {
      target.disabled = true;
    }
    await prevWinnersPage();
  },
  disabled: true,
};

const PARAMS_NEXT_BTN: IElementDisabled = {
  tagName: 'button',
  classNames: ['page-item', 'btn-next'],
  textContent: 'Next',
  parentSelector: '.winners-pagination',
  callback: async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (store.winnersPage + 1 === store.winnersPageCount) {
      target.disabled = true;
    }
    await nextWinnersPage();
  },
  disabled: false,
};

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
  createBasicElement(PARAMS_WINNERS_PAGINATION_WRAPPER);
  if (store.winnersPageCount > 1) {
    createDisabledElement(PARAMS_PREV_BTN);
    createDisabledElement(PARAMS_NEXT_BTN);
  }

  await updateStateWinners();
};

export default createWinners;
