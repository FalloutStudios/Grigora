const Mineflayer = require('mineflayer');
const Logger = require('../logger');
const GetData = require('../getDate')();

let log = new Logger();
    log.defaultPrefix = 'Connection';

module.exports = function () {
    this.playerNames = ['Grigora1', 'Grigora2', 'Grigora3'];
    this.serverIp = '127.0.0.1';
    this.serverPort = 25565;
    this.serverVersion = null;

    this.connected = 0;
    this.connectionLimit = object.keys(this.playerNames).lenght;

    this.newBot = () => {
        let ip = this.serverIp.trim().toLowerCase();
        let port = parseInt(this.serverPort.toString());

        let playerName = this.playerNames[connected];

        log.log('Connecting to server, Player: ' + playerName + '; Ip: ' + ip + '; Port: ' + port);

        var bot = mineflayer.createBot({
            host: ip,
            port: port,
            username: playerName,
            version: this.serverVersion
        });
    }
}