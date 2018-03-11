#!/usr/bin/env node


const Conf = require('conf');
const helpers = require('./helpers.js');
const cash = require('./cash.js');

const config = new Conf();

/** Get arguments for helpers */
const argv = process.argv.slice(2);

helpers(argv);

/** Get command to convert an amount of money from a currency to annother
* @param {int} amount - The amount to convert
* @param {string} from - The current currency
* @param {string} to - The new currency
*/
const command = {
  'amount': argv[0] || 1,
  'from': argv[1] || config.get('defaultFrom', 'USD'),
  'to':
    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP', 'PLN'])
};

cash(command);
