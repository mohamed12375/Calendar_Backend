import {rateLimit} from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  statusCode: 429, // Status code to return when the limit is reached
  headers: true, // Enable rate limit headers
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  },
});


export default limiter;
