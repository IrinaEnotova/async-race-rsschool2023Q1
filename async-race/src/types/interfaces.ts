export interface IBasicElementParams {
  tagName: string;
  classNames: string[];
  textContent?: string;
  parentSelector: string;
  callback?: (() => void) | null;
}
