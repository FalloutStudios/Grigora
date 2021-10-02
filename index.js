// Grigora GPL-3.0 license

// Core modules
const Mineflayer = require('mineflayer');

// Local modules
const Logger = require('./scripts/logger');
const Version = require('./scripts/version');
const Config = require('./scripts/config');

let config = new Config().parse();
let log = new Logger();