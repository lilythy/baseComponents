export interface Item {
  name: string;
  key: number;
  state?: 'undo' | 'done' | 'current';
  valid?: boolean; // 标识是否可点击
}
export interface Iprops {
  className?: string;
  data: Item[] | any;
}
