import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import stripeWebhook from './app/modules/payment/payment.webhook';
import router from './routes';
import { Morgan } from './shared/morgen';
const app = express();
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers['accept-encoding']?.includes('br')) {
        return true;
      }
      return false;
    },
  }),
);

//morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

app.post(
  '/api/v1/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook,
);
//body parser
app.use(
  cors({
    origin: [
      'https://www.africantraditionalarchitecture.com',
      'https://africantraditionalarchitecture.com',

      'http://localhost:3000',
      'http://localhost:3002',
      'http://10.10.7.101:3000',
      'http://10.10.7.100:3001',
      'http://10.10.7.102:3002',
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//file retrieve
app.use(express.static('uploads'));

//router
app.use('/api/v1', router);

//live response
app.get('/', (req: Request, res: Response) => {
  res.redirect('https://www.africantraditionalarchitecture.com');
});

//global error handle
app.use(globalErrorHandler);

//handle not found route;
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;

// Developed by Muhammad Ranju
// Website: https://mdranju.vercel.app
