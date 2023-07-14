/* eslint-disable max-lines-per-function */
import { createBasicElement, createElementWithInner } from '../../utils/createElements';
import getCarImg from '../../utils/getCarImg';
import { ICar } from '../../types/interfaces';
import './car-block.css';

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
  createBasicElement({
    tagName: 'button',
    classNames: ['car-btn', 'select-btn'],
    textContent: 'Select',
    parentSelector: `.btns-container-${id}`,
    callback: () => {
      console.log('Select car');
    },
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
