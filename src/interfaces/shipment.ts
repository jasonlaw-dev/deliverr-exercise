import { ItemCounts } from './item-counts';

export interface Shipment {
  [warehouseName: string]: ItemCounts;
}
