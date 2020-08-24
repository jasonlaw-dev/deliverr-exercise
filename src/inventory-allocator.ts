import { Order } from './interfaces/order';
import { Warehouse } from './interfaces/warehouse';

export class InventoryAllocator {
  constructor(public warehouses: Warehouse[]) {
  }

  process(order: Order) {

  }
}
