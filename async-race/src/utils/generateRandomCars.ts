import { ICarWithoutId } from '../types/interfaces';
import carBrands from './carBrands';
import carModels from './carModels';

const generateName = (): string => {
  const idxBrand: number = Math.floor(Math.random() * carBrands.length);
  const idxModel: number = Math.floor(Math.random() * carModels.length);
  const brand = carBrands[idxBrand];
  const model = carModels[idxModel];
  const name = `${brand} ${model}`;

  return name;
};

const generateColor = (): string => {
  const symbolsForColor = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    const currentIdx = Math.floor(Math.random() * 16);
    color += symbolsForColor[currentIdx];
  }

  return color;
};

const generateNewCar = (): ICarWithoutId => {
  const car = {
    name: generateName(),
    color: generateColor(),
  };

  return car;
};

const generateRandomCars = (): ICarWithoutId[] => {
  const cars = [];
  for (let i = 0; i < 3; i += 1) {
    cars.push(generateNewCar());
  }

  return cars;
};

export default generateRandomCars;
