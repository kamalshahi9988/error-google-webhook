const express = require("express");
const reporterMiddleware = require("../index");

const app = express();

app.use("/", (req, res, next) => {
  res.status(413);
  throw new Error("Payload Too Large");
});

// Use as the middleware
app.use(reporterMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});