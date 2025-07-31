'use strict';

// 🧪 MOCKING DEPENDENCIES
// This tells Jest to mock the '../../lib/events' module so we can observe calls to `.emit` without emitting real events.
jest.mock('../../lib/events');

// 🎯 REQUIRE MODULES TO TEST
// Import the mocked event emitter (eventPool) and the functions we're testing (createPackage and thankDriver).
const eventPool = require('../../lib/events');
const { createPackage, thankDriver } = require('../clients/vendor/handler');

// 🧪 CHANCE MODULE (used in original app, but not directly here)
const Chance = require('chance');

// 🔍 GROUP TEST CASES
describe('Vendor Handlers', () => {
  let mockPayload;

  // 🛠️ SETUP BEFORE EACH TEST
  // This block runs before every individual test to ensure a clean test environment.
  beforeEach(() => {
    // Define a consistent fake "order" object to use for all tests.
    mockPayload = {
      store: '1-347-noodles',
      orderId: 'test-order-123',
      customer: 'Jason',
      address: 'Seattle, WA',
    };

    // Mock `console.log` to prevent actual logging and to allow us to assert it was called.
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Spy on the emit method so we can check if it was called with the correct event and payload.
    jest.spyOn(eventPool, 'emit');
  });

  // 🔄 CLEANUP AFTER EACH TEST
  // Clears mocks after each test so no test data "leaks" into the next one.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ TEST #1: createPackage should emit a PICKUP event
  test('createPackage emits PICKUP event', () => {
    // Call the function using our fake order
    createPackage(mockPayload);

    // Assert that it logs the correct message
    expect(console.log).toHaveBeenCalledWith('VENDOR: We have an order ready');

    // Assert that it emits a 'PICKUP' event with the correct payload
    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', mockPayload);
  });

  // ✅ TEST #2: thankDriver should log a thank-you message
  test('thankDriver logs a thank you message', () => {
    // Call the function with our mock payload
    thankDriver(mockPayload);

    // Check that the thank-you message includes orderId and customer
    expect(console.log).toHaveBeenCalledWith(
      `VENDOR: Thank you for delivering ${mockPayload.orderId}, ${mockPayload.customer}!`
    );
  });
});

/*  
jest.mock(...): replaces the real eventPool module with a mock version so we can track and control its behavior.

jest.spyOn(...): watches functions like console.log or eventPool.emit so you can verify how and with what arguments they were used.

beforeEach & afterEach: common testing patterns to prepare a fresh state before each test and clean up afterward.

expect(...): assertion function used to check if certain actions occurred (like logging or emitting events).
*/
