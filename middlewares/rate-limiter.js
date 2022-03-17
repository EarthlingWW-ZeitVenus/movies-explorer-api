const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 1000 * 60 * 15, // "окно-ограничитель" выставлено в 15 минут
  max: 100, // ограничивает количество запросов с каждого IP-адреса
  // до 100 запросов в течении "окна-ограничителя"
});

module.exports = limiter;
