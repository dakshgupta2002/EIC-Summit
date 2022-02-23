import 'dotenv/config'
import express from 'express';
import cors from 'cors';

import userRouter from './routers/userRouter.js';
import './config/db.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

app.listen('3333', () => {
    console.log("Hello Backend");
});