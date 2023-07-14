/* eslint-disable max-lines-per-function */
import { createBasicElement, createElementWithData, createElementWithInner } from '../../utils/createElements';
import getCarImg from '../../utils/getCarImg';
import { ICar } from '../../types/interfaces';
import './car-block.css';
import store from '../../utils/store';

const createCarBlock = ({ name, color, id }: ICar): void => {
  createBasicElement({ tagName: 'div', classNames: [`car-block-${id}`, 'car-block'], parentSelector: '.garage' });
  createBasicElement({
    tagName: 'p',
    classNames: ['car-name'],
    parentSelector: `.car-block-${id}`,
    textContent: `${name}`,
  });
  createBasicElement({
    tagName: 'div',
    classNames: [`btns-container-${id}`, 'btns-container'],
    parentSelector: `.car-block-${id}`,
  });
  createElementWithData({
    tagName: 'button',
    classNames: ['car-btn', 'select-btn'],
    textContent: 'Select',
    parentSelector: `.btns-container-${id}`,
    callback: (event: Event) => {
      const target = event.target as HTMLElement;
      const selectedId = target.getAttribute('data-index');
      const nameInput = document.querySelector('.input-text_update') as HTMLInputElement;
      const colorInput = document.querySelector('.input-color_update') as HTMLInputElement;
      const updateBtn = document.querySelector('.btn-update') as HTMLButtonElement;

      if (selectedId) {
        store.selectedCarIndex = +selectedId - 1;
        store.selectedCar = store.carsArray[store.selectedCarIndex];
      }
      nameInput.disabled = false;
      colorInput.disabled = false;
      updateBtn.disabled = false;

      nameInput.value = store.selectedCar.name;
      colorInput.value = store.selectedCar.color;
    },
    dataIndex: `${id}`,
  });
  createBasicElement({
    tagName: 'button',
    classNames: ['car-btn', 'delete-btn'],
    textContent: 'Delete',
    parentSelector: `.btns-container-${id}`,
    callback: () => {
      console.log('Delete car');
    },
  });
  createBasicElement({
    tagName: 'button',
    classNames: ['car-btn', 'start-btn', `start-btn-${id}`],
    textContent: 'A',
    parentSelector: `.btns-container-${id}`,
    callback: () => {
      console.log('Start engine');
    },
  });
  createBasicElement({
    tagName: 'button',
    classNames: ['car-btn', 'stop-btn'],
    textContent: 'B',
    parentSelector: `.btns-container-${id}`,
    callback: () => {
      console.log('Stop engine');
    },
  });
  createElementWithInner({
    tagName: 'div',
    classNames: [`car-img-${id}`, 'car-img'],
    parentSelector: `.car-block-${id}`,
    innerHTML: getCarImg(color),
  });
  createBasicElement({ tagName: 'div', classNames: ['flag'], parentSelector: `.car-block-${id}` });
};

export default createCarBlock;
