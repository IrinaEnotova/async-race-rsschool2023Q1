import { createBasicElement } from './helpers/createElements';
import './normalize.css';
import './global.css';

createBasicElement({
  tagName: 'h1',
  textContent: 'Async Race',
  classNames: ['main-heading'],
  parentSelector: 'body',
  callback: () => {
    console.log('hello from heading!');
  },
});
