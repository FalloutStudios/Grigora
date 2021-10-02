function logMsg(text = '', prefix = null, level = 1){
    if(level < 1 || level > 3) throw new Error("Invalid log level");

    switch (true){
        case (level === 1):
            prefix = prefix != null ? "[INFO - " + prefix + "] " : "[INFO] ";
            
            if (typeof text == 'string' || typeof text == 'number') {
                console.log(prefix + text);
            } else {
                console.log(prefix);
                console.log(text);
            }
            break;
        case (level === 2):
            prefix = prefix != null ? "[WARN - " + prefix + "] " : "[WARN] ";
            
            if (typeof text == 'string' || typeof text == 'number') {
                console.warn('\x1b[33m%s\x1b[0m', prefix + text);
            } else {
                console.log(prefix);
                console.log(text);
            }
            break;
        case (level === 3):
            prefix = prefix != null ? "[ERROR - " + prefix + "] " : "[ERROR] ";
            
            if (typeof text == 'string' || typeof text == 'number') {
                console.log('\x1b[31m%s\x1b[0m', prefix + text);
            } else {
                console.log(prefix);
                console.log(text);
            }
            break;
    }
}

module.exports = function () {
    this.defaultPrefix = null;
    this.log = (text, prefix) => {
        if(this.defaultPrefix != null && prefix == null) prefix = this.defaultPrefix;
        logMsg(text, prefix, 1);
    }
    this.warn = (text, prefix) => {
        if(this.defaultPrefix != null && prefix == null) prefix = this.defaultPrefix;
        logMsg(text, prefix, 2);
    }
    this.error = (text, prefix) => {
        if(this.defaultPrefix != null && prefix == null) prefix = this.defaultPrefix;
        logMsg(text, prefix, 3);
    }
}