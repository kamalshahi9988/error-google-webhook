const axios = require(`axios`);
require("dotenv").config();

async function reporterMiddleware(err, req, res, next) {
  console.log(err?.message);
  try {
    const WEBHOOK_URL = process.env.WEBHOOK_URL;
    if (res.res.statusCode !== 200 && res.res.statusCode !== 404) {
      if (WEBHOOK_URL) {
        const msg = JSON.stringify(err.stack);
        const response = await axios.post(WEBHOOK_URL, {
          text: JSON.stringify(`{"msg": ${err?.message}, "error": ${msg}}`),
        });
        console.log(response?.data);
        return next();
      }
      throw new Error("Add WEBHOOK_URL as env variable");
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = reporterMiddleware;
