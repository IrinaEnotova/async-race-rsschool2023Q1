export interface IBasicElementParams {
  tagName: string;
  classNames: string[];
  textContent?: string;
  innerHTML?: string;
  parentSelector: string;
  callback?: (() => void) | null;
}

export interface IInputParams {
  classNames: string[];
  type: string;
  placeholder?: string;
  parentSelector: string;
  disabled: boolean;
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

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinners {
  items: IWinner[];
  count: number;
}

export interface IStore {
  carsPage: number;
  carsArray: ICar[];
  carsCount: number;
  winnersPage: number;
  winnersArray: IWinner[];
  winnersCount: number;
  currentPage: 'garage' | 'winners';
}
