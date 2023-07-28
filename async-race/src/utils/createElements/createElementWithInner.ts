import { IBasicElementParams } from '../../types/interfaces';

const createElementWithInner = ({
  tagName,
  classNames = [],
  innerHTML = '',
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
  if (innerHTML) {
    basicElement.innerHTML = innerHTML;
  }

  parentElement?.append(basicElement);
};

export default createElementWithInner;
