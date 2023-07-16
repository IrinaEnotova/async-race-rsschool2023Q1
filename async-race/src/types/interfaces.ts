export interface IBasicElementParams {
  tagName: string;
  classNames: string[];
  textContent?: string;
  innerHTML?: string;
  parentSelector: string;
  callback?: ((event: Event) => void) | null;
}

export interface IElementDisabled extends IBasicElementParams {
  dataIndex?: string;
  disabled: boolean;
}

export interface IInputParams {
  classNames: string[];
  type: string;
  placeholder?: string;
  parentSelector: string;
  disabled: boolean;
}

export interface IEventElementParams {
  tagName: string;
  classNames: string[];
  textContent?: string;
  innerHTML?: string;
  parentSelector: string;
  callback: (event: Event) => void;
  dataIndex?: string;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ICarWithoutId {
  name: string;
  color: string;
}

export interface ICars {
  items: ICar[];
  count: number;
}

export interface ICarCharacteristics {
  velocity: number;
  distance: number;
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
  selectedCarIndex: number;
  selectedCar: ICar;
  winnersPage: number;
  winnersArray: IWinner[];
  winnersCount: number;
  currentPage: 'garage' | 'winners';
}
