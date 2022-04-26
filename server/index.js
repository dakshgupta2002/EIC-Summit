import 'dotenv/config'
import express from 'express';
import './config/db.js';
import { auth } from './middlewares/auth.js';
import cors from 'cors';

const app = express();
app.options('*', cors());
app.use(express.json());

//register or login a new user
import userRouter from './routers/userRouter.js';
app.use('/user', userRouter);

//if user has token present, no need to ask for login 
app.use(auth);

//create events, update events, delete events 
import eventRouter from './routers/eventRouter.js';
app.use("/events", eventRouter)

//get and post the comments of an event using its id
import commentRouter from './routers/commentRouter.js';
app.use("/events/comments", commentRouter);

app.listen('3333', () => {
    console.log("Hello Backend");
});