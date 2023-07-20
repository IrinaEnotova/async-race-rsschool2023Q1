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
  WINNERS_PER_PAGE,
} from '../utils/consts';
import { createBasicElement, createDisabledElement } from '../utils/createElements';
import { updateStateWinners } from '../api/api-update';
import store from '../utils/store';
import { IElementDisabled } from '../types/interfaces';
import './winners.css';

async function chooseWinsSorting(event: Event): Promise<void> {
  const target = event.target as HTMLElement;
  const tbody = document.querySelector('.tbody') as HTMLElement;
  const timeColumn = document.querySelector('.th-time') as HTMLElement;
  tbody.textContent = '';
  timeColumn.classList.remove('desc');
  timeColumn.classList.remove('asc');

  if (!target.classList.contains('asc') && !target.classList.contains('desc')) {
    target.classList.add('desc');
    await updateStateWinners(store.winnersPage, WINNERS_PER_PAGE, 'wins', 'desc');
  } else if (target.classList.contains('desc')) {
    target.classList.add('asc');
    target.classList.remove('desc');
    await updateStateWinners(store.winnersPage, WINNERS_PER_PAGE, 'wins', 'asc');
  } else {
    target.classList.add('desc');
    target.classList.remove('asc');
    await updateStateWinners(store.winnersPage, WINNERS_PER_PAGE, 'wins', 'desc');
  }
}

async function chooseTimeSorting(event: Event): Promise<void> {
  const target = event.target as HTMLElement;
  const tbody = document.querySelector('.tbody') as HTMLElement;
  const winsColumn = document.querySelector('.th-wins') as HTMLElement;
  tbody.textContent = '';
  winsColumn.classList.remove('desc');
  winsColumn.classList.remove('asc');

  if (!target.classList.contains('asc') && !target.classList.contains('desc')) {
    target.classList.add('desc');
    await updateStateWinners(store.winnersPage, WINNERS_PER_PAGE, 'time', 'desc');
  } else if (target.classList.contains('desc')) {
    target.classList.add('asc');
    target.classList.remove('desc');
    await updateStateWinners(store.winnersPage, WINNERS_PER_PAGE, 'time', 'asc');
  } else {
    target.classList.add('desc');
    target.classList.remove('asc');
    await updateStateWinners(store.winnersPage, WINNERS_PER_PAGE, 'time', 'desc');
  }
}

async function prevWinnersPage(): Promise<void> {
  const winnersContainer = document.querySelector('.tbody') as HTMLElement;
  const nextBtn = document.querySelector('.btn-next-winners') as HTMLButtonElement;
  const page = document.querySelector('.winners_page-number') as HTMLElement;
  winnersContainer.innerHTML = '';
  nextBtn.disabled = false;

  const currentPage = store.winnersPage - 1;
  store.winnersPage -= 1;
  page.textContent = `Page #${currentPage}`;

  await updateStateWinners(currentPage);
}

async function nextWinnersPage(): Promise<void> {
  const winnersContainer = document.querySelector('.tbody') as HTMLElement;
  const prevBtn = document.querySelector('.btn-prev-winners') as HTMLButtonElement;
  const page = document.querySelector('.winners_page-number') as HTMLElement;
  winnersContainer.innerHTML = '';
  prevBtn.disabled = false;

  const currentPage = store.winnersPage + 1;
  store.winnersPage += 1;
  page.textContent = `Page #${currentPage}`;

  await updateStateWinners(currentPage);
}

const PARAMS_PREV_BTN: IElementDisabled = {
  tagName: 'button',
  classNames: ['page-item', 'btn-prev-winners'],
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
  classNames: ['page-item', 'btn-next-winners'],
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
  createBasicElement({
    ...PARAMS_TH_ITEM,
    textContent: 'Wins',
    classNames: ['th-wins'],
    callback: async (event: Event) => {
      await chooseWinsSorting(event);
    },
  });
  createBasicElement({
    ...PARAMS_TH_ITEM,
    textContent: 'Best time (sec)',
    classNames: ['th-time', 'desc'],
    callback: async (event: Event) => {
      await chooseTimeSorting(event);
    },
  });
  createBasicElement(PARAMS_TBODY);
  createBasicElement(PARAMS_WINNERS_PAGINATION_WRAPPER);
  createDisabledElement(PARAMS_PREV_BTN);
  createDisabledElement(PARAMS_NEXT_BTN);

  await updateStateWinners();
};

export default createWinners;
