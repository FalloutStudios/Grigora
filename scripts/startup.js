const Logger = require('./logger');
const Version = require('./version');
let log = new Logger();
    log.defaultPrefix = 'Startup';
module.exports = () => {
    log.log(`  ▄████  ██▀███   ██▓  ▄████  ▒█████   ██▀███   ▄▄▄     `);
    log.log(` ██▒ ▀█▒▓██ ▒ ██▒▓██▒ ██▒ ▀█▒▒██▒  ██▒▓██ ▒ ██▒▒████▄    `);
    log.log(`▒██░▄▄▄░▓██ ░▄█ ▒▒██▒▒██░▄▄▄░▒██░  ██▒▓██ ░▄█ ▒▒██  ▀█▄  `);
    log.log(`░▓█  ██▓▒██▀▀█▄  ░██░░▓█  ██▓▒██   ██░▒██▀▀█▄  ░██▄▄▄▄██ `);
    log.log(`░▒▓███▀▒░██▓ ▒██▒░██░░▒▓███▀▒░ ████▓▒░░██▓ ▒██▒ ▓█   ▓██▒`);
    log.log(` ░▒   ▒ ░ ▒▓ ░▒▓░░▓   ░▒   ▒ ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░`);
    log.log(`  ░   ░   ░▒ ░ ▒░ ▒ ░  ░   ░   ░ ▒ ▒░   ░▒ ░ ▒░  ▒   ▒▒ ░`);
    log.log(`░ ░   ░   ░░   ░  ▒ ░░ ░   ░ ░ ░ ░ ▒    ░░   ░   ░   ▒   `);
    log.log(`      ░    ░      ░        ░     ░ ░     ░           ░  ░`);
    log.log('Grigora Version - ' + Version);
    log.log('GitHub: https://github.com/FalloutStudios/Grigora');
}