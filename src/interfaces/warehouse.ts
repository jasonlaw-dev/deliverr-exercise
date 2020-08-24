import { ItemCounts } from './item-counts';

export interface Warehouse {
  name: string;
  inventory: ItemCounts;
}
