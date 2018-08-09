/* global logger */

module.exports = () => {
  try {
    logger.info('I am making the coffee.');
  } catch (err) {
    logger.error(err.message);
  }
};
