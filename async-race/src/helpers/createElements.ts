import { IBasicElementParams, IInputParams } from '../types/interfaces';

export const createBasicElement = ({
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

export const createInputElement = ({ classNames = [], type, placeholder, parentSelector }: IInputParams): void => {
  const inputElement = document.createElement('input');
  const parentElement = document.querySelector(parentSelector);

  if (classNames.length > 0) {
    classNames.forEach((className: string) => inputElement.classList.add(className));
  }
  if (placeholder) {
    inputElement.placeholder = placeholder;
  }
  inputElement.type = type;

  parentElement?.append(inputElement);
};

export const createElementWithInner = ({
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
