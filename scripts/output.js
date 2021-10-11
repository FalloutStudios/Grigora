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

    this.write = () => {
        if(!this.location || this.location == null) { 
            log.error('No output location specified');
            return;
        }
        if(!this.records || this.records == null) {
            log.error('No records specified');
            return;
        }

        let contents = this.output;
        if(!Fs.existsSync(this.location)) {
            log.warn('Creating records file');
            Fs.writeFileSync(this.location, Yml.stringify(this.output));
        } else {
            log.warn('Reading records file');
            contents = Yml.parse(Fs.readFileSync(this.location, 'utf-8'));
        }

        if(!contents.servers[this.outputId] || typeof contents.servers[this.outputId] == 'undefined') contents.servers[this.outputId] = {};
        log.log(contents);
        
        log.warn('Editing records');
        for (const value of Object.keys(this.records)) {
            contents.servers[this.outputId][value] = this.records[value];
        }
        log.log(contents);
    }
}