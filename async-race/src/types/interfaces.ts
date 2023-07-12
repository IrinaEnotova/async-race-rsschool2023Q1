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
