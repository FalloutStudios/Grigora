const Prompt = require('prompt-sync')();

module.exports = function () {
    this.prompt = (config) => {
        if(config == null || !config) throw new Error('Undefined config file');
        config.server.ip = this.getIp(config.server.ip);
        config.server.port = this.getPort(config.server.port);
        config.players = this.getPlayers(config.players);

        switch (true) {
            case (!this.validateIp(config.server.ip)):
                throw new Error('Invalid IP');
            case (!this.validatePort(config.server.port)):
                throw new Error('Invalid Port');
        }

        return config;
    }

    this.getIp = (IP) => {
        if(IP == null || !IP.length){
            IP = Prompt('Server IP (No port): ');
        }
        return IP;
    }
    this.getPort = (PORT) => {
        if(PORT == null || isNaN(PORT.toString())){
            PORT = Prompt('Server Port: ');
        }
        return PORT;
    }
    this.getPlayers = (PLAYERS) => {
        if (typeof PLAYERS == 'object') {
            if(PLAYERS != null || PLAYERS) return PLAYERS;
        } else if (typeof PLAYERS == 'string') {
            if(PLAYERS != '' || PLAYERS.length) return [PLAYERS];
        }

        let newList = Prompt('Enter Player Names (Separate by comma: , ): ');

            if(newList.length == 0 || newList == null || newList.trim() == '') throw new Error('No Player Names were entered');

            newList = newList.trim().split(',');

            PLAYERS = [];

            for (const value of newList) {
                PLAYERS = PLAYERS.concat(value.trim());
            }

        return PLAYERS;
    }

    this.validateIp = (IP) => {
        if(IP == null || IP.length == 0) return false;
        return true;
    }
    this.validatePort = (PORT) => {
        if(isNaN(PORT) || PORT  < 1 || PORT > 65535) return false;
        return true;
    }
}