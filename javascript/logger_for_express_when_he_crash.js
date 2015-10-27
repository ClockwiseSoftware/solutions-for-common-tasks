//app.js // server start point

//....
var log = require('./core/log')(module);
//....


//logger.js
var winston = require('winston');

function getLogger(module) {
	var path = module.filename.split('/').slice(-2).join('/');

	return new(winston.Logger)({
		transports: [
			new(winston.transports.Console)({
				colorize: true,
				level: 'debug',
				label: path
			}),
			new(winston.transports.File)({
				colorize: true,
				level: 'error',
				filename: 'somefile.log'
			})
		],
		exceptionHandlers: [
			new winston.transports.File({
				filename: 'exceptions.js', // this file will show last errors after crash server 
				json: true
			})
		]
	});
}

module.exports = getLogger;
