// Grigora GPL-3.0 license

// Local modules
const Logger = require('./scripts/logger');
const Startup = require('./scripts/startup')();

const Config = require('./scripts/config');
const PromptConfig = require('./scripts/promptConfig');
const TestMode = require('./scripts/testmode');

const Player = require('./scripts/player');


const log = new Logger();
    log.defaultPrefix = 'Grigora';

let config = new Config();
    config.location = './config/config.yml';
    config = config.parse();

let testMode = new TestMode();
    config = testMode.testMode(config);

let promptConfig = new PromptConfig();
    config = promptConfig.prompt(config);

