const logger = require('log4js').getLogger('lifebot');
const cron = require('node-schedule');

if (process.env.NODE_ENV !== 'production') {
  logger.level = process.env.LIFEBOT_LOGGER_LEVEL || 'debug';
} else {
  logger.level = process.env.LIFEBOT_LOGGER_LEVEL;
}

try {
  require('dotenv').config();
  logger.info('Configuration loaded.');
} catch (err) {
  logger.error(`Configuration file not loaded. ${err.message}`);
}
