const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const dotenv = require('dotenv');

const logger = require('./config/logger');

dotenv.config({path : './src/config.env'})
const port = process.env.PORT || 8080
let server;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(3000, () => {
    logger.info(`Server is running at port http://localhost:${port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
