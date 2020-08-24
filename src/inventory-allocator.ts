/* eslint-disable no-restricted-syntax */
import { ItemCounts } from './interfaces/item-counts';
import { Order } from './interfaces/order';
import { Shipment } from './interfaces/shipment';
import { Warehouse } from './interfaces/warehouse';

export class InventoryAllocator {
  // store all counts in one place
  private globalWarehouse: Warehouse;

  constructor(public warehouses: Warehouse[]) {
    this.globalWarehouse = {
      name: 'global',
      inventory: {},
    };
    // add all counts into globalWarehouse
    warehouses.forEach((warehouse) => {
      Object.entries(warehouse.inventory).forEach(([name, count]) => {
        this.globalWarehouse.inventory[name] = (this.globalWarehouse.inventory[name] || 0) + count;
      });
    });
  }

  process(order: Order): Shipment[] {
    // make a copy so that we don't modify the original order.
    const remainingItems: Order = { ...order };
    const shipments: Shipment[] = [];

    const isValidOrder = Object.values(remainingItems).every((value) => value != null && value > 0);
    // make sure we have all items before proceeding
    const hasInventory = Object.entries(remainingItems).every(([name, count]) => (
      (this.globalWarehouse.inventory[name] || 0) >= count
    ));
    if (isValidOrder && hasInventory) {
      for (const warehouse of this.warehouses) {
        const shipmentItems: ItemCounts = {};
        Object.entries(remainingItems).forEach(([name, count]) => {
          if (warehouse.inventory[name] != null && warehouse.inventory[name] > 0) {
            const numbersToShip = Math.min(warehouse.inventory[name], count);

            shipmentItems[name] = numbersToShip;

            warehouse.inventory[name] -= numbersToShip;
            this.globalWarehouse.inventory[name] -= numbersToShip;
            remainingItems[name] -= numbersToShip;

            // delete fulfilled item to speed up
            if (remainingItems[name] === 0) {
              delete remainingItems[name];
            }
          }
        });
        if (Object.keys(shipmentItems).length > 0) {
          shipments.push({ [warehouse.name]: shipmentItems });
        }
        // terminate early if all items are fulfilled
        if (Object.keys(remainingItems).length === 0) {
          break;
        }
      }
    }
    return shipments;
  }
}
