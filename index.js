// Grigora GPL-3.0 license

// Local modules
const Logger = require('./scripts/logger');
const Startup = require('./scripts/startup')();
const output = require('./scripts/output');

const Config = require('./scripts/config');
const PromptConfig = require('./scripts/promptConfig');
const TestMode = require('./scripts/testmode');

const Player = require('./scripts/player.js');


const log = new Logger();
    log.defaultPrefix = 'Grigora';

let config = new Config();
    config.location = './config/config.yml';
    config = config.parse();

let testMode = new TestMode();
    config = testMode.testMode(config);

let promptConfig = new PromptConfig();
    config = promptConfig.prompt(config);
log.log(config.players);
let createBot = new Player();
    createBot.playerNames = config['players'];
    createBot.serverIp = config['server']['ip'];
    createBot.serverPort = config['server']['port'];
    createBot.serverVersion = config['server']['version'];
    createBot.connectInterval = config['connect-interval'];
    createBot.newBot();

let outputCompiler = new output();
    outputCompiler.location = config['output-file'];
    outputCompiler.outputId = config.server.ip;
    outputCompiler.records = createBot.records;

    createBot.events.on('finish', function () {
        outputCompiler.write();
    });