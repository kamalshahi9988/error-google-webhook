const axios = require(`axios`);

async function reporterMiddleware(req, res, next) {
  try {
    console.log("Test");

    const WEBHOOK_URL = "process.env.WEBHOOK_URL";
    // const WEBHOOK_URL = process.env.WEBHOOK_URL;

    const text = `Hello test message here`;
    const response = await axios.post(WEBHOOK_URL, {
      text: text,
    });
    console.log(response);
    next();
  } catch (err) {
    console.log(Err);

    throw new Error(err);
  }
}

module.exports = reporterMiddleware;
