export default function animateCar(currentId: number, duration: number): void {
  const currentCarImg = document.querySelector(`.car-img-${currentId}`) as HTMLElement;
  const endX = window.innerWidth - 160;
  let currentX = currentCarImg.offsetLeft;
  const framesCount = (duration / 1000) * 60;
  const dx = (endX - currentCarImg.offsetLeft) / framesCount;

  const tick = (): void => {
    currentX += dx;
    currentCarImg.style.transform = `translateX(${currentX}px)`;
    if (currentX < endX) {
      requestAnimationFrame(tick);
    }
  };

  tick();
}
