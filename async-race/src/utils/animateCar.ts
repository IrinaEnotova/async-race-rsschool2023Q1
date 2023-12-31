import { switchCarEngine } from '../api/api-garage';
import { INTERNAL_SERVER_ERROR } from './constants/consts_API';
import { IRequestIds } from '../types/interfaces';
import store from './store';

export const requestIds: IRequestIds = {};

async function checkServerError(currentId: number): Promise<void> {
  const driveCarResponse = await switchCarEngine(currentId, 'drive');
  const messageBlock = document.querySelector(`.car-engine-${currentId}`) as HTMLElement;

  if (driveCarResponse.status === INTERNAL_SERVER_ERROR) {
    cancelAnimationFrame(Number(requestIds[`${currentId}`]));
    messageBlock.textContent = 'The engine was broken!';
    store.sortedCars = store.sortedCars.filter((item) => item[0] !== `${currentId}`);
  }
}

export function animateCar(currentId: number, duration: number): void {
  const currentCarImg = document.querySelector(`.car-img-${currentId}`) as HTMLElement;
  const endX = window.innerWidth - 160;
  let currentX = currentCarImg.offsetLeft;
  const framesCount = (duration / 300) * 60;
  const dx = (endX - currentCarImg.offsetLeft) / framesCount;

  const tick = (): void => {
    currentX += dx;
    currentCarImg.style.transform = `translateX(${currentX}px)`;
    if (currentX < endX) {
      requestIds[`${currentId}`] = requestAnimationFrame(tick).toString();
    }
  };

  checkServerError(currentId);
  tick();
}
