const Mineflayer = require('mineflayer');
const Logger = require('../logger');
const GetData = require('../getDate')();

let log = new Logger();
    log.defaultPrefix = 'Connection';

function f2i (float = 0.0){
    return Math.floor(float);
}

module.exports = function () {
    this.playerNames = ['Grigora1', 'Grigora2', 'Grigora3'];
    this.serverIp = '127.0.0.1';
    this.serverPort = 25565;
    this.serverVersion = null;

    this.connected = 0;
    this.connectionLimit = object.keys(this.playerNames).lenght;

    this.record = {};

    this.newBot = () => {
        let ip = this.serverIp.trim().toLowerCase();
        let port = parseInt(this.serverPort.toString());

        let playerName = this.playerNames[connected];

        log.log('Connecting to server, Player: ' + playerName + '; Ip: ' + ip + '; Port: ' + port);

        let bot = mineflayer.createBot({
            host: ip,
            port: port,
            username: playerName,
            version: this.serverVersion
        });

        let spawned = false;

        bot.once('spawn', () => {
            log.log(playerName + ' spawned!');
            spawned = true;

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
                lastCheck: date_dmy + ' - ' + date_h+':'+date_m + ' ' + date_mm
            }

            log.warn('Disconnecting: ' + playerName);
            setTimeout(() => {
                bot.quit();
                bot.end();
            }, 500);
        });

        bot.on('error', function (reason){
            log.error('\x1b[31m%s\x1b[0m','[Error - Minecraft Bot] Error ' + playerName + ' - ' + reason);
    
            if(bot) {
                bot.quit();
                bot.end();
            }
        });
        bot.on('kicked', function (reason){
            log.error('\x1b[31m%s\x1b[0m','[Error - Minecraft Bot] Kicked ' + playerName + ' - ' + reason);

            if(bot) {
                bot.quit();
                bot.end();
            }
        });

        bot.on('end', async function(){
            log.log('\x1b[33m%s\x1b[0m','[Log - Minecraft Bot] Ended: '+playerName);

            if(spawned) this.connected++;

            if(connected > connectionLimit) return;

            await connect();

            function connect() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        this.newBot();
                    }, this.connectInterval);
                });
            };
        });
    }
}