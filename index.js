// Grigora GPL-3.0 License

// Modules/Packages
const mineflayer = require('mineflayer');
const yml = require('yaml');
const prompt = require('prompt-sync')();
const fs = require('fs');

// Config
let config = parseConfig();

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
