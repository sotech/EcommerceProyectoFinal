const log4js = require("log4js");

//Log4js
log4js.configure({
  appenders: {
    loggerConsola: { type: 'console' },
    loggerWarn: { type: 'file', filename: 'logs/warn.log' },
    loggerError: { type: 'file', filename: 'logs/error.log' },
  },
  categories: {
    default: { appenders: ["loggerConsola"], level: 'info' },
    warnings: { appenders: ["loggerWarn"], level: 'warn' },
    errors: { appenders: ["loggerError"], level: 'error' },
  }
});