/* global logger */

global.logger = require('log4js').getLogger('lifebot');
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

try {
  const jobsList = process.env.LIFEBOT_JOBS || '';
  if (jobsList) {
    const jobs = jobsList.split(',').map(job => {
      const arr = job.split('|');
      if (arr.length === 2) {
        return { name: arr[0], schedule: arr[1] };
      } else {
        logger.error(
          `'${job}' did not split into exactly 2 elements. Entry skipped.`
        );
      }
    });
    logger.info(`Jobs ready: ${jobs.length}`);
    jobs.forEach(job => {
      try {
        cron.scheduleJob(job.schedule, () => {
          try {
            require(job.name);
          } catch (err) {
            logger.error(err.message);
          }
        });
      } catch (err) {
        logger.error(err.message);
      }
    });
  }
} catch (err) {
  logger.error(`Error parsing jobs list. ${err.message}`);
}
