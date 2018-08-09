/* global logger */

module.exports = () => {
  try {
    logger.info('Hello, World!');
  } catch (err) {
    logger.error(err.message);
  }
};
