'use strict';
// Global Events Pool

const EE = require('events');
const events = new EE();
module.exports = events;

/*  
You're importing Node’s built-in EventEmitter class (require('events')).

You're creating a new instance of that class: new EventEmitter() (or new EE() in your version).

You're exporting it so other files can emit and listen for events using the same shared instance.
*/