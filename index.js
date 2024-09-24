const axios = require(`axios`);
require("dotenv").config();

async function reporterMiddleware(req, res, next) {
  try {
    const WEBHOOK_URL = process.env.WEBHOOK_URL;
    if (res.res.statusCode !== 200 && res.res.statusCode !== 404) {
      if (WEBHOOK_URL) {
        const text = `Hello test message here`;
        const response = await axios.post(WEBHOOK_URL, {
          text: text,
        });
        console.log(response?.data);
        return next();
      }
      throw new Error("Add WEBHOOK_URL as env variable");
    }
    next();
  } catch (err) {
    return next(err);
  }
}

module.exports = reporterMiddleware;
