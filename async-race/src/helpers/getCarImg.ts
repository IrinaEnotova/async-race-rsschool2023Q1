// eslint-disable-next-line import/no-cycle
import { CAR_SVG } from './consts';

const getCarImg = (color: string): string => {
  const img = CAR_SVG.replace('#000000', color);
  return img;
};

export default getCarImg;
