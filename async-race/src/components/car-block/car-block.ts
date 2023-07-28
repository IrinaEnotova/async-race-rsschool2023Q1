import createBasicElement from '../../utils/createElements/createBasicElement';
import createElementWithData from '../../utils/createElements/createElementWithData';
import createElementWithInner from '../../utils/createElements/createElementWithInner';
import createDisabledElement from '../../utils/createElements/createDisabledElement';
import getCarImg from '../../utils/getCarImg';
import { ICar } from '../../types/interfaces';
import store from '../../utils/store';
import { deleteCar, startEngine, switchCarEngine } from '../../api/api-garage';
import { animateCar, requestIds } from '../../utils/animateCar';
import './car-block.css';
import { deleteWinner } from '../../api/api-winners';
// eslint-disable-next-line import/no-cycle
import { updateStateGarage, updateStateWinners } from '../../api/api-update';

const createSelectButton = (id: number): void => {
  createElementWithData({
    tagName: 'button',
    classNames: ['car-btn', 'select-btn'],
    textContent: 'Select',
    parentSelector: `.btns-container-${id}`,
    callback: () => {
      const nameInput = document.querySelector('.input-text_update') as HTMLInputElement;
      const colorInput = document.querySelector('.input-color_update') as HTMLInputElement;
      const updateBtn = document.querySelector('.btn-update') as HTMLButtonElement;

      const selectedCar = store.fullCarsArray.find((item) => item.id === id) as ICar;
      store.selectedCar = selectedCar;

      nameInput.disabled = false;
      colorInput.disabled = false;
      updateBtn.disabled = false;

      nameInput.value = selectedCar.name;
      colorInput.value = selectedCar.color;
    },
    dataIndex: `${id}`,
  });
};

const createDeleteButton = (id: number): void => {
  createElementWithData({
    tagName: 'button',
    classNames: ['car-btn', 'delete-btn'],
    textContent: 'Delete',
    parentSelector: `.btns-container-${id}`,
    callback: async (event: Event) => {
      const carsContainer = document.querySelector('.cars-container') as HTMLElement;
      const carsCount = document.querySelector('.garage-heading') as HTMLElement;
      const winnersCount = document.querySelector('.winners-heading') as HTMLElement;
      const tbody = document.querySelector('.tbody') as HTMLElement;
      carsCount.textContent = `Garage: ${store.carsCount - 1} ${store.carsCount === 1 ? 'car' : 'cars'}`;

      carsContainer.textContent = '';
      tbody.textContent = '';

      const target = event.target as HTMLElement;
      const selectedId = Number(target.getAttribute('data-index'));
      await deleteCar(selectedId);
      await updateStateGarage();
      const winnerCar = store.winnersArray.find((winner) => {
        return selectedId === winner.id;
      });
      if (winnerCar) {
        winnersCount.textContent = `Winners: ${store.winnersCount - 1} ${store.winnersCount === 1 ? 'car' : 'cars'}`;
        await deleteWinner(selectedId);
        await updateStateWinners();
      }
    },
    dataIndex: `${id}`,
  });
};

const createStartButton = (id: number): void => {
  createDisabledElement({
    tagName: 'button',
    classNames: ['car-btn', 'start-btn', `start-btn-${id}`],
    textContent: 'A',
    parentSelector: `.btns-container-${id}`,
    callback: async (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const stopBtn = document.querySelector(`.stop-btn-${id}`) as HTMLButtonElement;
      const carEngine = document.querySelector(`.car-engine-${id}`) as HTMLElement;
      target.disabled = true;
      stopBtn.disabled = false;
      carEngine.textContent = '';

      const { velocity, distance } = await startEngine(id, 'started');
      const duration = distance / velocity;

      animateCar(id, duration);
    },
    dataIndex: `${id}`,
    disabled: false,
  });
};

const createStopButton = (id: number): void => {
  createDisabledElement({
    tagName: 'button',
    classNames: ['car-btn', `stop-btn-${id}`],
    textContent: 'B',
    parentSelector: `.btns-container-${id}`,
    callback: async (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const startBtn = document.querySelector(`.start-btn-${id}`) as HTMLButtonElement;
      const carImg = document.querySelector(`.car-img-${id}`) as HTMLElement;
      const carEngine = document.querySelector(`.car-engine-${id}`) as HTMLElement;
      target.disabled = true;
      startBtn.disabled = false;

      await switchCarEngine(id, 'stopped');
      cancelAnimationFrame(Number(requestIds[`${id}`]));
      carImg.style.transform = `translateX(0px)`;
      carEngine.textContent = '';
    },
    dataIndex: `${id}`,
    disabled: true,
  });
};

const createCarEngine = (id: number): void => {
  createBasicElement({
    tagName: 'p',
    classNames: [`car-engine-${id}`, 'car-engine'],
    parentSelector: `.car-info-${id}`,
    textContent: ``,
  });
};

const createCarBlock = ({ name, color, id }: ICar): void => {
  createBasicElement({
    tagName: 'div',
    classNames: [`car-block-${id}`, 'car-block'],
    parentSelector: '.cars-container',
  });
  createBasicElement({
    tagName: 'div',
    classNames: [`car-info-${id}`, 'car-info'],
    parentSelector: `.car-block-${id}`,
    textContent: ``,
  });
  createBasicElement({
    tagName: 'p',
    classNames: ['car-name'],
    parentSelector: `.car-info-${id}`,
    textContent: `${name}`,
  });
  createCarEngine(id);
  createBasicElement({
    tagName: 'div',
    classNames: [`btns-container-${id}`, 'btns-container'],
    parentSelector: `.car-block-${id}`,
  });
  createSelectButton(id);
  createDeleteButton(id);
  createStartButton(id);
  createStopButton(id);
  createElementWithInner({
    tagName: 'div',
    classNames: [`car-img-${id}`, 'car-img'],
    parentSelector: `.car-block-${id}`,
    innerHTML: getCarImg(color),
  });
  createBasicElement({ tagName: 'div', classNames: ['flag'], parentSelector: `.car-block-${id}` });
};

export default createCarBlock;
