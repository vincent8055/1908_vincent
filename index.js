module.exports.handler = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Your function executed successfully!",
          access_key: process.env.ACCESS_KEY
        },
        null,
        2
      ),
    };
  };

const express = require("express");
const winston = require("winston");
const app = express();
const port = 3000;
const logger = winston.createLogger({
  // Log only if level is less than (meaning more severe) or equal to this
  level: "info",
  
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    ],
});


app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

// Handle HTTP GET requests to the root path
app.get("/", (req, res) => {
  // Log messages at different log levels
  logger.log("error", "This is an error message from vincent8055");
  logger.log("warn", "This is a warning message vincent8055");
  logger.log("info", "This is an info message vincent8055");
  logger.log("verbose", "This is a verbose message vincent8055");
  logger.log("debug", "This is a debug message vincent8055");
  logger.log("silly", "This is a silly message vincent8055");
  
  // Send a response to the client
  res.send("Hello, world!");
});

// A route for manually triggering an error
app.get("/error", (req, res, next) => {
  throw new Error('This is a test error');
})

// Handle errors using the logger
app.use((err, req, res, next) => {

  // Log the error message at the error level
  logger.error(err.message);
  res.status(500).send();
});

// Start the app and listen on the specified port
 app.listen(port, () => {
  logger.log("info", `App listening on port ${port}!`);
});

