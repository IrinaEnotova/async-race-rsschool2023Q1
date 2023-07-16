import { driveCar } from '../api/api-garage';
import { INTERNAL_SERVER_ERROR } from './consts';

let requestId = 0;

async function checkServerError(currentId: number): Promise<void> {
  const driveCarResponse = await driveCar(currentId, 'drive');
  const messageBlock = document.querySelector(`.car-engine-${currentId}`) as HTMLElement;
  if (driveCarResponse.status === INTERNAL_SERVER_ERROR) {
    cancelAnimationFrame(requestId);
    messageBlock.textContent = 'The engine was broken!';
  }
}

export default function animateCar(currentId: number, duration: number): void {
  const currentCarImg = document.querySelector(`.car-img-${currentId}`) as HTMLElement;
  const endX = window.innerWidth - 160;
  let currentX = currentCarImg.offsetLeft;
  const framesCount = (duration / 1000) * 60;
  const dx = (endX - currentCarImg.offsetLeft) / framesCount;

  const tick = (): number => {
    currentX += dx;
    currentCarImg.style.transform = `translateX(${currentX}px)`;
    if (currentX < endX) {
      requestId = requestAnimationFrame(tick);
    }

    return requestId;
  };

  checkServerError(currentId);
  tick();
}
