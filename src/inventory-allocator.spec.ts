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
    name: 'simplest case',
    warehouses: [{ name: 'owd', inventory: { apple: 1 } }],
    order: { apple: 1 },
    expectedOutput: [{ owd: { apple: 1 } }],
  },
  {
    name: 'no inventory case 1',
    warehouses: [{ name: 'owd', inventory: { apple: 0 } }],
    order: { apple: 1 },
    expectedOutput: [],
  },
  {
    name: 'no inventory case 2',
    warehouses: [{ name: 'owd', inventory: { apple: 1 } }, { name: 'dm', inventory: { apple: 3 } }],
    order: { apple: 5 },
    expectedOutput: [],
  },
  {
    name: 'no inventory case 3',
    warehouses: [{ name: 'owd', inventory: { apple: 1, orange: 3 } }, {
      name: 'dm',
      inventory: { apple: 4, orange: 1 },
    }],
    order: { apple: 5, orange: 5 },
    expectedOutput: [],
  },
  {
    name: 'invalid order case 1',
    warehouses: [{ name: 'owd', inventory: { apple: 1 } }],
    order: { apple: 0 },
    expectedOutput: [],
  },
  {
    name: 'invalid order case 2',
    warehouses: [{ name: 'owd', inventory: { apple: 1 } }],
    order: { apple: 1, orange: -1 },
    expectedOutput: [],
  },
  {
    name: 'split order case 1',
    warehouses: [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 } }],
    order: { apple: 10 },
    expectedOutput: [{ owd: { apple: 5 } }, { dm: { apple: 5 } }],
  },
  {
    name: 'split order case 2',
    warehouses: [{ name: 'owd', inventory: { apple: 7 } }, { name: 'dm', inventory: { apple: 5 } }],
    order: { apple: 10 },
    expectedOutput: [{ owd: { apple: 7 } }, { dm: { apple: 3 } }],
  },
  {
    name: 'split order case 3',
    warehouses: [
      { name: 'owd', inventory: { apple: 7 } },
      { name: 'dm', inventory: { apple: 5, pineapple: 7 } },
      { name: 'jfk', inventory: { pineapple: 10 } },
    ],
    order: { apple: 10, pineapple: 15 },
    expectedOutput: [
      { owd: { apple: 7 } },
      { dm: { apple: 3, pineapple: 7 } },
      { jfk: { pineapple: 8 } },
    ],
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
