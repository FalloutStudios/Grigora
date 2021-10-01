const Logger = require("./logger");
const Utility = require("./util");
const Version = require("./version");

const log = new Logger();
const util = new Utility();

log.defaultPrefix = 'Startup';

module.exports = () => {
    var versionTag = '================================= v' + Version +' =================================';
    log.log();
    log.log(' __    __    ________    ________     ________     ______   ______     __');
    log.log('|  |  |  |  |__    __|  |   ___  \\   |   ___  \\   |   ___|  |     \\   |  |');
    log.log('|  |__|  |     |  |     |  |   |  |  |  |   |  |  |  |___   |  |\\  \\  |  |');
    log.log('|   __   |     |  |     |  |   |  |  |  |   |  |  |   ___|  |  | \\  \\ |  |');
    log.log('|  |  |  |   __|  |__   |  |___|  |  |  |___|  |  |  |___   |  |  \\  \\|  |');
    log.log('|__|  |__|  |________|  |________/   |________/   |______|  |__|   \\_____|');
    log.log();
    log.log();
    log.log(versionTag);
    log.log();
    log.log('Repository: https://github.com/FalloutStudios/HiddenPlayer');
    log.log();
    log.log(util.loop(versionTag.length, '='));
}