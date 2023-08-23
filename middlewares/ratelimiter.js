const rateLimit = require('express-rate-limit');

const fullLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
  message: { message: 'Слишком много запросов с этого IP, попробуйте повторить запрос через 15 мин' },
  standardHeaders: true,
  legacyHeaders: false,
});

const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 100 requests per `window` (here, per 1 hour)
  message: { message: 'Слишком много запросов на создание аккаунта с этого IP, попробуйте повторить запрос через 1 час' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  fullLimiter,
  createLimiter,
};
