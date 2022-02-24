import { Router } from "express";
import User from "../model/userModel.js";
const userRouter = Router();

userRouter.route('/login')
        .all((req, res, next) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                next();
        })
        .post((req, res) => {
                const user = new User(req.body);
                user.save()
                        .then((user) => {
                                res.status(200).json({"success:": true, "user": user});
                        })
                        .catch((err) => {
                                res.status(400).json({"success:": false, "error": err});
                        });
        })


export default userRouter;