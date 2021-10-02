const Yml = require('yaml');
const Fs = require('fs');
const Version = require('./version');

module.exports = function () {
    this.location = null;
    this.parse = () => {
        if (this.location == null || !this.location) throw new Error('Config location is undefined');

        const fileData = Fs.readFileSync(this.location, 'utf-8');
        let configYml = Yml.parse(fileData);

        if(configYml.version != Version) throw new Error('Incompatible config version');

        return configYml;
    }
}