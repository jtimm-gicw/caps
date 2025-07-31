'use strict';
//vendor

const eventPool = require('../../lib/events');
let Chance = require('chance');
let chance = new Chance();

// Vendor creates package
function createPackage(payload=null) {
  if(!payload){
    payload = {
      store: '1-347-noodles',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  
  // log not required, but maybe useful for auditing functionality
  console.log('VENDOR: We have a noodle order ready');
  eventPool.emit('PICKUP', payload);
}

// Vendor listens for delivery confirmation
// eventPool.on('DELIVERY', (payload) => {
//   console.log(`VENDOR: Thank you for delivering ${payload.orderId}, ${payload.customer}!`);
// });


function thankDriver(payload= null){
  if (!payload){
    payload = {
      customer: chance.name(),
    };
  }
  console.log(`Thank you for ordering our noodles ${payload.customer}!`);
}

module.exports = {
  createPackage,
  thankDriver,
};
