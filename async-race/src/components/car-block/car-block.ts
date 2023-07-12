import { createBasicElement } from '../../helpers/createElements';
import { ICar } from '../../types/interfaces';

const createCarBlock = ({ name, color, id }: ICar): void => {
  createBasicElement({
    tagName: 'div',
    classNames: ['test'],
    parentSelector: '.garage',
    textContent: `Car ${name} color ${color} id ${id}`,
  });
};

export default createCarBlock;
