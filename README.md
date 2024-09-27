# Application error reporting on google chat using google webhook API

```
Package: error-google-webhook whould be use as a middleware.
```

## Dependencies:

- **axios**
- **express**
- **dotenv**

## How to use ?

Install the package

    npm i --save error-google-webhook

Configure dotenv

    WEBHOOK_URL="WEBHOOK_URL_VALUE"
    WEBHOOK_SKIP_CODES=[200]

```javascript
// server.js
const express = require("express");
const reporterMiddleware = require("error-google-webhook");

const app = express();

app.use("/", (req, res, next) => {
  res.status(413);
  throw new Error("Payload too large.");
});

// Use as the middleware
app.use(reporterMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Run the application using

    npm start
