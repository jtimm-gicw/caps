'use strict';

// Mock the event emitter module so we can track event emissions without actually emitting real events
jest.mock('../../lib/events');

// Import the mocked event emitter and the handler functions we want to test
const eventPool = require('../../lib/events');
const { createPackage, thankDriver } = require('../clients/vendor/handler');

// Chance could be used to generate random test data, but is not used in this test directly
const Chance = require('chance');

// Describe a group of related tests for the Vendor handler functions
describe('Vendor Handlers', () => {
  let mockPayload;

  // beforeEach runs before each test – used here to reset the test payload and spies
  beforeEach(() => {
    // This mockPayload simulates a real order object
    mockPayload = {
      store: '1-347-noodles',
      orderId: 'test-order-123',
      customer: 'Jason',
      address: 'Seattle, WA',
    };

    // Spy on console.log to check whether it's called (and silence it during test output)
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Spy on eventPool.emit to check if our handler emits the correct events
    jest.spyOn(eventPool, 'emit');
  });

  // afterEach runs after each test – clears any mocks/spies so tests don't interfere with each other
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case for the createPackage function
  test('createPackage emits PICKUP event', () => {
    // Call the function we’re testing with our fake payload
    createPackage(mockPayload);

    // Check that console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith('VENDOR: We have an order ready');

    // Check that the 'PICKUP' event was emitted with the correct payload
    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP', mockPayload);
  });

  // Test case for the thankDriver function
  test('thankDriver logs a thank you message', () => {
    // Call the thankDriver function with our test payload
    thankDriver(mockPayload);

    // Check that console.log was called with the correct thank-you message
    expect(console.log).toHaveBeenCalledWith(
      `VENDOR: Thank you for delivering ${mockPayload.orderId}, ${mockPayload.customer}!`
    );
  });
});
