const Commander = require('commander');
const promptConfig = require('./promptConfig');

let configValidate = new promptConfig();

let commands = new Commander.Command;
    
    commands
        .option('--testmode')
        .option('--ip <ip>')
        .option('--port <port>')
        .option('--players <players>');
    commands.parse();

module.exports = function () {
    this.testMode = (config = {servers: {}, players: []}) => {
        config.server = {
            ip: 'play.ourmcworld.ml',
            port: 25565,
            version: null
        }
        config.players = ['Grigora1', 'Grigora2', 'Grigora3']

        if(!commands.opts().testmode) return config;

        if(commands.opts().ip && typeof commands.opts().ip == 'string') config.servers.ip = commands.opts().ip
        
        if(commands.opts().port && typeof parseInt(commands.opts().port) == 'number') config.servers.port = parseInt(commands.opts().port)
    
        if(commands.opts().players && typeof commands.opts().players == 'string') config.players = configValidate.getPlayers(config.players);

        return config;
    }
}