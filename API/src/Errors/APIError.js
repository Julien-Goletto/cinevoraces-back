const { appendFile } = require('fs/promises');
const path = require('path');

/**
 * @typedef {object} APIError
 * @property {string} status
 * @property {number} statusCode
 * @property {string} message - Error message
 * @property {string} url - URL requested
 */
class APIError extends Error {
  constructor(message, url, status = 500) {
    super(message); // Call for the parent's constructor
    this.status = status;
    this.url = url;
  }

  /**
   * Log method for error display and archive
   * @params {string} Error message
   * @returns
   */
  async log() {
    // Instant dev feedback
    console.error(this.url, this.message, new Date());

    // Async writing in logfiles
    const logPath = path.resolve(__dirname, '../../logs');
    const fileName = `${new Date().toISOString().split('T')[0]}.csv`;
    await appendFile(`${logPath}/${fileName}`, `${new Date().toLocaleTimeString()},${this.url},${this.message}\n`);
  }
}

module.exports = APIError;
