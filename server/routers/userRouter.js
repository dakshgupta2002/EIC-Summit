import { Router } from "express";
const userRouter = Router();

userRouter.route('/')
.all( (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
})


export default userRouter;