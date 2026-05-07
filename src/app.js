import express from 'express';
import cors from 'cors';

import productRoute from './routes/product.route.js';
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoute);
app.use("/api/auth", authRoute);


export default app;
