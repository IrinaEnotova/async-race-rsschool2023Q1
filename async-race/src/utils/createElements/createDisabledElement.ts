import { IElementDisabled } from '../../types/interfaces';

const createDisabledElement = ({
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

export default createDisabledElement;
