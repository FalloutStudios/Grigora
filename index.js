// Grigora GPL-3.0 License

// Modules/Packages
const mineflayer = require('mineflayer');
const yml = require('yaml');
const prompt = require('prompt-sync')();
const fs = require('fs');

// Config
let config = parseConfig();

// Player Connection

let currentConnected = 0;
newBot(currentConnected, config['server']['ip'], config['server']['port'], config['server']['version']);

// Green: \x1b[32m%s\x1b[0m
// Orange: \x1b[33m%s\x1b[0m
// Red: \x1b[31m%s\x1b[0m

// Functions
// Parse config file to json
function parseConfig (path = 'config/config.yml') {
    let parsedYML = null;

    console.log('\x1b[32m%s\x1b[0m','[Log - Config] Reading config file...');

    let getContents = fs.readFileSync(path, 'utf-8');
        getContents = yml.parse(getContents);

        // Get inline server information
        if(getContents.server.ip == null){
            getContents.server.ip = prompt('Server IP (No port): ');
        }
        if(getContents.server.port == null){
            getContents.server.port = prompt('Server Port: ');
        }

        // Invalid port returns error
        if (isNaN(getContents.server.port) || typeof getContents.server.port != 'undefined' && isNaN(getContents.server.port) || getContents.server.port > 65535 || getContents.server.port < 1) { 
            console.error('\x1b[31m%s\x1b[0m', '[Error - Mincraft Bot] Invalid Port: '+getContents.server.port); 
            process.exit(0);        
        }

        // Get inline Playername
        if(typeof getContents.players == 'string'){
            if(getContents.players.trim() != '') {
                let playerNames = [getContents.players];

                getContents.players = playerNames;
            } else{
                getContents.players = null;
            }
        }

        if(getContents.players == null || getContents.players.length == 0){
            let playerNames = prompt('Enter Player Names (Separate by comma: , ): ');
            
            if(playerNames != null && playerNames.trim() != ''){
                playerNames = playerNames.split(',');

                getContents.players = playerNames;
            } else{
                console.error('\x1b[31m%s\x1b[0m','[Error - Config] No given player names');
                process.exit(0);
            }
        }

    parsedYML = getContents;

    console.log('\x1b[32m%s\x1b[0m','[Log - Config] Starting Grigora');
    console.log();
    console.log(parsedYML);
    console.log();

    return parsedYML;
}

//Create bot
function newBot(currentPlayer = 0, ip = 'localhost', port = 25565, version = null){

    // Parse ip and port
    ip = ip.trim().toLowerCase();
    port = parseInt(port, 10);

    console.log(currentPlayer + ' - ' +config['players'][currentPlayer]);

    let name = config['players'][currentPlayer];
        name = name.trim();

    console.log('[Log - Mincraft Bot] Starting '+name+' v'+version);

    // Set to default server port if null
    if(port == null || isNaN(port)){
        port = 25565;
    }

    // Invalid name returns error
    if(name == '' || name == null || typeof name != 'string' || name.length > 16 || name.length <= 4){
        console.error('\x1b[31m%s\x1b[0m','[Error - Minecraft Bot] '+name+' is Invalid name');
        return;
    }

    // Prevent object length overflow
    if(currentPlayer > config['players'].length) return;

    var bot = mineflayer.createBot({
        host: ip,
        port: port,
        username: name,
        version: version
    });

    console.log('[Log - Mincraft Bot] Connecting '+name+' v'+version);

    bot.on('spawn', function(){
        console.log();
        console.log('Bot '+name+' coords: '+bot.entity.position);
        console.log();

        bot.quit();
        bot.end();
    });

    bot.on('end', function(){
        console.log('[Log - Minecraft Bot] Ended: '+name);

        // New Player
        currentConnected++;
        newBot(currentConnected, config['server']['ip'], config['server']['port'], config['server']['version']);
    });

    bot.on('error', function (reason){
        console.error('\x1b[31m%s\x1b[0m','[Error - Minecraft Bot] '+reason);
    });
}