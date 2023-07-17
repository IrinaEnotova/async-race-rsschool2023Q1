import { switchCarEngine } from '../api/api-garage';
import { INTERNAL_SERVER_ERROR } from './consts';
import { IRequestIds } from '../types/interfaces';

export const requestIds: IRequestIds = {};

async function checkServerError(currentId: number): Promise<void> {
  const driveCarResponse = await switchCarEngine(currentId, 'drive');
  const messageBlock = document.querySelector(`.car-engine-${currentId}`) as HTMLElement;
  if (driveCarResponse.status === INTERNAL_SERVER_ERROR) {
    cancelAnimationFrame(Number(requestIds[`${currentId}`]));
    messageBlock.textContent = 'The engine was broken!';
  }
}

export function animateCar(currentId: number, duration: number): void {
  const currentCarImg = document.querySelector(`.car-img-${currentId}`) as HTMLElement;
  const endX = window.innerWidth - 160;
  let currentX = currentCarImg.offsetLeft;
  const framesCount = (duration / 1000) * 60;
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
