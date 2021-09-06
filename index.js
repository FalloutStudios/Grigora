// Grigora GPL-3.0 License

// Modules/Packages
const mineflayer = require('mineflayer');
const yml = require('yaml');
const prompt = require('prompt-sync')();
const fs = require('fs');

// Config
let config = parseConfig();
let complete_ip = config['server']['ip'] + ':' + config['server']['port'];
    complete_ip = complete_ip.trim().toLowerCase()

// Output file
let OutputFileEnalbed = false;
var Output = {};
    Output.servers = {};

if(config['output-file'] != null || config['output-file'].trim() != ''){
    OutputFileEnalbed = true;

    if(fs.existsSync(config['output-file'])){
        let outputFile = fs.readFileSync(config['output-file'], 'utf-8');
            outputFile = yml.parse(outputFile);

            if(outputFile != null && outputFile != ''){
                Output = outputFile;
            }
    } else{
        fs.writeFileSync(config['output-file'], yml.stringify(Output));
    }
}

if(typeof Output['servers'][complete_ip] == 'undefined'){
    Output['servers'][complete_ip] = {};
}

// Current Date
var date = new Date();
var date_d = String(date.getDate()).padStart(2, '0');
var date_m = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var date_y = date.getFullYear();
var date_dmy = date_d + '/' + date_m + '/' + date_y;

// Player Connection
let currentConnected = 0;
newBot(currentConnected, config['server']['ip'], config['server']['port'], config['server']['version']);

// Console colors
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

    return parsedYML;
}

//Create bot
function newBot(currentPlayer = 0, ip = 'localhost', port = 25565, version = null){

    // Parse ip and port
    ip = ip.trim().toLowerCase();
    port = parseInt(port, 10);

    let name = config['players'][currentPlayer];
        name = name.trim();

    console.log('\x1b[32m%s\x1b[0m','[Log - Mincraft Bot] Starting '+currentPlayer+':'+name+' '+version);

    // Set to default server port if null
    if(port == null || isNaN(port)){
        port = 25565;
    }

    // Invalid name returns error
    if(name == '' || name == null || typeof name != 'string' || name.length > 16 || name.length <= 4){
        console.error('\x1b[31m%s\x1b[0m','[Error - Minecraft Bot] '+name+' is Invalid name');
        return;
    }

    var bot = mineflayer.createBot({
        host: ip,
        port: port,
        username: name,
        version: version
    });
    var spanwned = false;

    console.log('\x1b[32m%s\x1b[0m','[Log - Mincraft Bot] Connecting '+name+' '+version);

    bot.once('spawn', function(){
        console.log();
        console.log('\x1b[34m%s\x1b[0m','[Log - Minecraft Bot] '+name+'\'s coordinates: '+f2i(bot.entity.position.x)+' '+f2i(bot.entity.position.y)+' '+f2i(bot.entity.position.z));
        console.log();
        
        //Record output
        Output['servers'][complete_ip][name] = {
            coordinates: f2i(bot.entity.position.x)+' '+f2i(bot.entity.position.y)+' '+f2i(bot.entity.position.z),
            verctor: {
                x: bot.entity.position.x,
                y: bot.entity.position.y,
                z: bot.entity.position.z
            },
            lastCheck: date_dmy
        }

        console.log('\x1b[33m%s\x1b[0m','[Log - Minecraft Bot] Disconnecting: '+name);
        setTimeout(() => {
            bot.quit();
            bot.end();
        }, 500);
    });

    bot.on('end', function(){
        console.log('\x1b[33m%s\x1b[0m','[Log - Minecraft Bot] Ended: '+name);

        newPlayer();
    });

    bot.on('error', function (reason){
        console.error('\x1b[31m%s\x1b[0m','[Error - Minecraft Bot] Error '+name+' - '+reason);

        if(spanwned) {
            bot.quit();
            bot.end();
        }
    });

    bot.on('kicked', function (reason){
        console.error('\x1b[31m%s\x1b[0m','[Error - Minecraft Bot] Kicked '+name+' - '+reason);
        bot.quit();
        bot.end();
    });
}

//create new player
function newPlayer(){
    // New Player
    currentConnected++;
    if(currentConnected < config.players.length){
        console.log('[Log - Minecraft Bot] Creating new bot with id of '+currentConnected);
        setTimeout(() => {
            newBot(currentConnected, config['server']['ip'], config['server']['port'], config['server']['version']);
        }, config['connect-interval']);
    } else{
        let FinalOutput = yml.stringify(Output);
        // Record Final Output
        console.log('[Log - Config] Editing '+config['output-file']+'');
        console.log();
        console.log('[Log - Config] Generated yml');
        console.log(FinalOutput);
        console.log();
        fs.writeFileSync(config['output-file'], FinalOutput);
        console.log('[Log - Grigora] Exiting process');
        process.exit(0);
    }
}

// Convert float to int
function f2i (float = 0.0){
    return Math.floor(float);
}