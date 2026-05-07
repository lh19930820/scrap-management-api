import express from 'express';
import cors from 'cors';

import productRoute from './routes/product.route.js';
import authRoute from "./routes/auth.route.js";
import transactionRoute from './routes/transaction.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoute);
app.use("/api/auth", authRoute);
app.use('/api/transactions', transactionRoute);

export default app;
