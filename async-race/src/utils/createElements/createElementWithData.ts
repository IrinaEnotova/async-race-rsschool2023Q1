import { IEventElementParams } from '../../types/interfaces';

const createElementWithData = ({
  tagName,
  classNames = [],
  textContent = '',
  parentSelector,
  callback,
  dataIndex,
}: IEventElementParams): void => {
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
  if (dataIndex) {
    basicElement.setAttribute('data-index', dataIndex);
  }

  parentElement?.append(basicElement);
};

export default createElementWithData;
