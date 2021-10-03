const Fs = require('fs');
const Logger = require('./logger');
const Yml = require('yaml');

let log = new Logger();
    log.defaultPrefix = 'Output Compiler';

module.exports = function () {
    this.location = null;
    this.records = {};
    this.outputId = null;

    this.output = { servers: {} };

    this.add = (descriptions = {}) => {

    }
    this.write = () => {
        if(!this.location || this.location == null) { 
            log.error('No output location specified');
            return;
        }

        let contents = this.output;
        if(!Fs.existsSync(this.location)) {
            Fs.writeFileSync(this.location, Yml.stringify(this.output));
        } else {
            contents = Yml.parse(Fs.readFileSync(this.location, 'utf-8'));
        }

        if(!contents.servers[this.outputId] || typeof contents.servers[this.outputId] == 'undefined') contents.servers[this.outputId] = {};

        contents.servers[this.outputId].concat(records);
    }
}