const Mineflayer = require('mineflayer');
const Logger = require('./logger');
const GetData = require('./getDate')();
const Emitter = require('events').EventEmitter;

let log = new Logger();
    log.defaultPrefix = 'Connection';

function f2i (float = 0.0){
    return Math.floor(float);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = function () {
    this.playerNames = ['Grigora1', 'Grigora2', 'Grigora3'];
    this.connectInterval = 5000;
    this.serverIp = 'play.ourmcworld.ml';
    this.serverPort = 25565;
    this.serverVersion = null;

    var connected = 0;
    var connectionLimit = Object.keys(this.playerNames).length;

    var record = {};
    let events = new Emitter();

    this.newBot = async () => {
        let ip = this.serverIp.trim().toLowerCase();
        let port = parseInt(this.serverPort.toString());
        let version = this.serverVersion;

        let playerNames = this.playerNames;
            connectionLimit = Object.keys(this.playerNames).length;
        let playerName = playerNames[connected];

        log.log('Preparing connection for ' + playerName);
        await sleep(this.connectInterval);

        var bot = Mineflayer.createBot({
            host: ip,
            port: port,
            username: playerName,
            version: version
        })

        log.log('Connecting to server, Player: ' + playerName + '; Ip: ' + ip + '; Port: ' + port);

        bot.once('spawn', () => {
            log.log(playerName + ' spawned!');

            let posX = bot.entity.position.x;
            let posY = bot.entity.position.y;
            let posZ = bot.entity.position.z;

            log.log('Spawn Position: ' + posX + ', ' + posY + ', ' +posZ);

            record[playerName] = {
                coordinates: f2i(posX)+' '+f2i(posY)+' '+f2i(posZ),
                verctor: {
                    x: posX,
                    y: posY,
                    z: posZ
                },
                lastCheck: GetData.fullDate + ' - ' + GetData.time_h+':'+GetData.time_mi + ' ' + GetData.time_clock
            }

            events.emit('spawn', playerName, posX, posY, posZ);

            log.warn('Disconnecting: ' + playerName);
            setTimeout(() => {
                bot.quit();
                bot.end();
            }, 1000);
        });
        bot.on('error', function (reason){
            log.error('Error ' + playerName + ' - ' + reason);
    
            try {
                bot.quit();
                bot.end();
            } catch (err) {}

            events.emit('error', reason);
        });
        bot.on('kicked', function (reason){
            log.warn('Kicked ' + playerName + ' - ' + reason);

            try {
                bot.quit();
                bot.end();
            } catch (err) {}

            events.emit('kicked', reason);
        });
        bot.on('end', function(){
            log.warn('Ended: '+playerName);

            connected++;
            spawned = false;

            events.emit('ended', playerName);
        });
    }


    this.events = events;
    this.events.on('ended', () => {
        if(connected >= connectionLimit) { this.events.emit('finish'); return; }
        log.warn('Reconnecting as '+ this.playerNames[connected]);

        this.newBot();
    });    
}