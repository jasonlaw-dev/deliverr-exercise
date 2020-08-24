export interface Warehouse {
  name: string;
  inventory: {
    [key: string]: number;
  };
}
