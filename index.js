const http = require('http');
const https = require('https');

function createGoogleChatPayload(err, res) {
  const msg = err.stack ?? 'No stack trace available';
  return {
    cards: [
      {
        sections: [
          {
            widgets: [
              {
                textParagraph: {
                  text: `<b>Error Message:</b> ${err?.message ?? 'No message available'}<br><b>Stack Trace:</b> ${msg}<br><b>Status Code:</b> ${res.statusCode}`,
                },
              },
            ],
          },
        ],
      },
    ],
  };
}

function sendPayload(url, payload) {
  const isHttps = url.startsWith('https');
  const lib = isHttps ? https : http;
  const data = JSON.stringify(payload);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = lib.request(url, options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    res.on('end', () => {
      console.log(responseData || 'No response data');
    });
  });

  req.on('error', (error) => {
    console.error('Error in sendPayload:', error);
  });

  req.write(data);
  req.end();
}

async function reporterMiddleware(err, req, res, next) {
  console.log(err?.message ?? 'Unknown error');

  const WEBHOOK_URL = process.env.WEBHOOK_URL;
  if (!WEBHOOK_URL) {
    console.error('Add WEBHOOK_URL as env variable');
    return next(new Error('Add WEBHOOK_URL as env variable'));
  }

  const WEBHOOK_SKIP_CODES = [200] || process.env.WEBHOOK_SKIP_CODES;
  if (!WEBHOOK_SKIP_CODES.includes(res.statusCode)) {
    try {
      const payload = WEBHOOK_URL.includes('chat.googleapis.com')
        ? createGoogleChatPayload(err, res)
        : {
            msg: err?.message ?? 'No message available',
            error: err.stack ?? 'No stack trace available',
            code: res.statusCode,
          };

      sendPayload(WEBHOOK_URL, payload);
    } catch (error) {
      console.error('Error in reporterMiddleware:', error);
      return next(error);
    }
  }

  return next();
}

module.exports = reporterMiddleware;
