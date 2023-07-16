import {
  createBasicElement,
  createElementWithData,
  createElementWithInner,
  createDisabledElement,
} from '../../utils/createElements';
import getCarImg from '../../utils/getCarImg';
import { ICar } from '../../types/interfaces';
import store from '../../utils/store';
import { deleteCar, startEngine } from '../../api/api-garage';
import animateCar from '../../utils/animateCar';
import './car-block.css';

function clearDataOnPage(): void {
  const garage = document.querySelector('.garage');
  const winners = document.querySelector('.tbody');

  if (garage) {
    garage.innerHTML = '';
  }
  if (winners) {
    winners.innerHTML = '';
  }
}

const createSelectButton = (id: number): void => {
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
};

const createDeleteButton = (id: number): void => {
  createElementWithData({
    tagName: 'button',
    classNames: ['car-btn', 'delete-btn'],
    textContent: 'Delete',
    parentSelector: `.btns-container-${id}`,
    callback: async (event: Event) => {
      const target = event.target as HTMLElement;
      const selectedId = Number(target.getAttribute('data-index'));

      clearDataOnPage();
      await deleteCar(selectedId);
      window.location.reload();
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
      console.log('Start engine');
      const target = event.target as HTMLButtonElement;
      const stopBtn = document.querySelector(`.stop-btn-${id}`) as HTMLButtonElement;
      console.log(stopBtn);
      target.disabled = true;
      stopBtn.disabled = false;
      const { velocity, distance } = await startEngine(id, 'started');
      const duration = distance / velocity;

      animateCar(id, duration);
      // const drive = await driveCar(id, 'drive');
      // console.log(drive.status);
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
    callback: () => {
      console.log('Stop engine');
    },
    dataIndex: `${id}`,
    disabled: true,
  });
};

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
