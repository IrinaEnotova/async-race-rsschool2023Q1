import createFooter from '../components/footer/footer';
import createHeader from '../components/header/header';
import createMain from '../components/main/main';

const createApp = (): void => {
  createHeader();
  createMain();
  createFooter();
};

export default createApp;
