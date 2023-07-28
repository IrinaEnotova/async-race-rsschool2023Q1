import { IInputParams } from '../../types/interfaces';

const createInputElement = ({ classNames = [], type, placeholder, parentSelector, disabled }: IInputParams): void => {
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

export default createInputElement;
