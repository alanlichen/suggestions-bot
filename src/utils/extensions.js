/* MISCELLANEOUS NON-CRITICAL FUNCTIONS */

// EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
// later, this conflicts with native code. Also, if some other lib you use does
// // this, a conflict also occurs. KNOWING THIS however, the following methods
// // are, we feel, very useful in code.

// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
const logger = require('./logger');

process.on('uncaughtException', (err) => {
  const msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
  logger.error(`Uncaught Exception: \n ${msg}`);
  // Always best practice to let the code crash on uncaught exceptions.
  // Because you should be catching them anyway.
  process.exit(1);
});

process.on('unhandledRejection', err => {
  const msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
  logger.error(`Unhandled Rejection: \n ${msg}`);
});

process.on('SIGINT', async () => {
  logger.log('SIGINT signal received.');
  logger.log('Bot shutting down...');
  await process.exit(0);
});

// <String>.toPropercase() returns a proper-cased string such as:
// "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// <Array>.random() returns a single random element from an array
// [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

String.prototype.cleanLineBreaks = function() {
  return this.replace(/<br ?\/?>/g, '\n');
};

String.prototype.cleanDoubleQuotes = function() {
  return this.replace(/"/g, '\\"');
};

String.prototype.replaceWithBreakTags = function() {
  return this.replace(/\n/g, '<br/>');
};
