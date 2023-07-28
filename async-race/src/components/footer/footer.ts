import {
  PARAMS_FOOTER,
  PARAMS_FOOTER_GITHUB,
  PARAMS_FOOTER_YEAR,
  PARAMS_FOOTER_RS_LOGO,
} from '../../utils/constants/consts';
import createBasicElement from '../../utils/createElements/createBasicElement';
import './footer.css';

const createFooter = (): void => {
  createBasicElement(PARAMS_FOOTER);
  createBasicElement(PARAMS_FOOTER_GITHUB);
  createBasicElement(PARAMS_FOOTER_YEAR);
  createBasicElement(PARAMS_FOOTER_RS_LOGO);
};

export default createFooter;
