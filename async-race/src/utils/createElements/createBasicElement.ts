import { IBasicElementParams } from '../../types/interfaces';

const createBasicElement = ({
  tagName,
  classNames = [],
  textContent = '',
  parentSelector,
  callback = null,
}: IBasicElementParams): void => {
  const basicElement = document.createElement(tagName);
  const parentElement = document.querySelector(parentSelector);

  if (classNames.length > 0) {
    classNames.forEach((className: string) => basicElement.classList.add(className));
  }
  if (callback) {
    basicElement.addEventListener('click', callback);
  }
  if (textContent) {
    basicElement.textContent = textContent;
  }

  parentElement?.append(basicElement);
};

export default createBasicElement;
