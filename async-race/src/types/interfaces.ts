export interface IBasicElementParams {
  tagName: string;
  classNames: string[];
  textContent?: string;
  parentSelector: string;
  callback?: (() => void) | null;
}

export interface IInputParams {
  classNames: string[];
  type: string;
  placeholder?: string;
  parentSelector: string;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ICars {
  items: ICar[];
  count: number;
}

export interface IStore {
  carsPage: number;
  carsArray: ICar[];
  carsCount: number;
  currentPage: 'garage' | 'winners';
}
