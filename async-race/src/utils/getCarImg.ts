import { CAR_SVG } from './constants/consts';

const getCarImg = (color: string): string => {
  const img = CAR_SVG.replace('#000000', color);
  return img;
};

export default getCarImg;
