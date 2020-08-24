/* eslint-disable no-restricted-syntax */
import { Order } from './interfaces/order';
import { Shipment } from './interfaces/shipment';
import { Warehouse } from './interfaces/warehouse';

export class InventoryAllocator {
  constructor(public warehouses: Warehouse[]) {
  }

  process(order: Order): Shipment[] {
    return [];
  }
}
