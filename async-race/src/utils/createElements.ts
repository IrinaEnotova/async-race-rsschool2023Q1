import { IBasicElementParams, IElementDisabled, IEventElementParams, IInputParams } from '../types/interfaces';

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

export const createDisabledElement = ({
  tagName,
  classNames = [],
  textContent = '',
  parentSelector,
  callback = null,
  dataIndex,
  disabled = true,
}: IElementDisabled): void => {
  const element = document.createElement(tagName) as HTMLButtonElement;
  const parentElement = document.querySelector(parentSelector);

  if (classNames.length > 0) {
    classNames.forEach((className: string) => element.classList.add(className));
  }
  if (callback) {
    element.addEventListener('click', callback);
  }
  if (textContent) {
    element.textContent = textContent;
  }
  if (disabled) {
    element.disabled = true;
  }
  if (dataIndex) {
    element.setAttribute('data-index', dataIndex);
  }

  parentElement?.append(element);
};

export const createElementWithData = ({
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

export const createInputElement = ({
  classNames = [],
  type,
  placeholder,
  parentSelector,
  disabled,
}: IInputParams): void => {
  const inputElement = document.createElement('input');
  const parentElement = document.querySelector(parentSelector);

  if (classNames.length > 0) {
    classNames.forEach((className: string) => inputElement.classList.add(className));
  }
  if (placeholder) {
    inputElement.placeholder = placeholder;
  }
  if (disabled) {
    inputElement.disabled = true;
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

export const createElementWithEvent = ({
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
