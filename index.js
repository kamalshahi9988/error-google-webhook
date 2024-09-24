// webhookurl required,
// and enable webhook or not
class ErrorGoogleWebhook {
  constructor({ webhookUrl, isEnable }) {
    this.webhookUrl = webhookUrl;
    this.isEnable = isEnable;
  }

  sendError() {
    console.log("err");
    return "error";
  }
}

const ss = new ErrorGoogleWebhook({
  webhookUrl: process.env.ERROR_WEBHOOK_URL,
  isEnable: true,
});

ss.sendError();

module.exports = ErrorGoogleWebhook;
