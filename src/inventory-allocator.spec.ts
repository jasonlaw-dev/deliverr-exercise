import { expect } from 'chai';
import { Order } from './interfaces/order';
import { Shipment } from './interfaces/shipment';
import { Warehouse } from './interfaces/warehouse';
import { InventoryAllocator } from './inventory-allocator';

interface TestCase {
  name: string;
  warehouses: Warehouse[];
  order: Order;
  expectedOutput: Shipment[];
}

const testCases: TestCase[] = [
  {
    name: 'Happy case',
    warehouses: [{ name: 'owd', inventory: { apple: 1 } }],
    order: { apple: 1 },
    expectedOutput: [{ owd: { apple: 1 } }],
  },
];

describe('Inventory Allocator', () => {
  testCases.forEach((testCase) => {
    it(`should handle ${testCase.name}`, () => {
      const allocator = new InventoryAllocator(testCase.warehouses);
      expect(allocator.process(testCase.order)).to.deep.equal(testCase.expectedOutput);
    });
  });
});
