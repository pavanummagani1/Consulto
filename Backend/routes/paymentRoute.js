// paymentRoute.js
import express from 'express';
import { createPaymentIntent, handleWebhook } from '../Controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', createPaymentIntent);
paymentRouter.post('/webhook', express.raw({type: 'application/json'}), handleWebhook);

export default paymentRouter;