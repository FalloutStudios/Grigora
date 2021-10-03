// Grigora GPL-3.0 license

// Local modules
const Logger = require('./scripts/logger');
const Startup = require('./scripts/startup')();
const output = require('./scripts/output');

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

let bot = new Player();
    bot.playerNames = config.players;
    bot.serverIp = config.server.ip;
    bot.serverPort = config.server.port;
    bot.serverVersion = config.server.version;
    bot.connectInterval = config['connect-interval'];

let outputCompiler = new output();
    outputCompiler.location = config['output-file'];
    outputCompiler.records = bot.records;
    outputCompiler.write();