import { IEventElementParams } from '../../types/interfaces';

const createElementWithEvent = ({
  tagName,
  classNames = [],
  textContent = '',
  parentSelector,
  callback,
}: IEventElementParams): void => {
  const basicElement = document.createElement(tagName);
  const parentElement = document.querySelector(parentSelector);

  if (classNames.length > 0) {
    classNames.forEach((className: string) => basicElement.classList.add(className));
  }
  if (textContent) {
    basicElement.textContent = textContent;
  }
  basicElement.addEventListener('click', callback);

  parentElement?.append(basicElement);
};

export default createElementWithEvent;
