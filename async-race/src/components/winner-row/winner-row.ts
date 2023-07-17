import { ICar, IWinner } from '../../types/interfaces';
import { createBasicElement, createElementWithInner } from '../../utils/createElements';
import getCarImg from '../../utils/getCarImg';
import store from '../../utils/store';
import './winners-row.css';

const createWinnerRow = ({ id, wins, time }: IWinner, index: number): void => {
  const currentCar = store.fullCarsArray.find((item) => item.id === id) as ICar;

  createBasicElement({ tagName: 'tr', classNames: [`winner-row-${id}`, 'tr'], parentSelector: '.tbody' });
  createBasicElement({
    tagName: 'td',
    textContent: `${index + 1}`,
    classNames: [`td-index-${id}`, 'td'],
    parentSelector: `.winner-row-${id}`,
  });
  createElementWithInner({
    tagName: 'td',
    classNames: [`car-small-img-${id}`, 'car-small-img'],
    parentSelector: `.winner-row-${id}`,
    innerHTML: getCarImg(currentCar.color),
  });
  createBasicElement({
    tagName: 'td',
    textContent: `${currentCar.name}`,
    classNames: [`car-name-${id}`, 'car-winner-name'],
    parentSelector: `.winner-row-${id}`,
  });
  createBasicElement({
    tagName: 'td',
    textContent: `${wins}`,
    classNames: [`car-wins-${id}`, 'car-wins'],
    parentSelector: `.winner-row-${id}`,
  });
  createBasicElement({
    tagName: 'td',
    textContent: `${time}`,
    classNames: [`car-time-${id}`, 'car-time'],
    parentSelector: `.winner-row-${id}`,
  });
};

export default createWinnerRow;
