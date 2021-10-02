// Grigora GPL-3.0 license

// Core modules
const Mineflayer = require('mineflayer');

// Local modules
const Logger = require('./scripts/logger');
const Version = require('./scripts/version');
const Config = require('./scripts/config');
const PromptConfig = require('./scripts/promptConfig')
const Startup = require('./scripts/startup')();

const log = new Logger();
    log.defaultPrefix = 'Grigora';
let config = new Config();
    config.location = './config/config.yml';
    config = config.parse();
let promptConfig = new PromptConfig();
    config = promptConfig.prompt(config);

    log.log(config);