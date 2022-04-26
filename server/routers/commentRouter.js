import { Router } from "express";
import Comment from '../model/commentModel.js';
const commentRouter = Router();

commentRouter.route("*")
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    });

commentRouter.route("/:id")
    .get(async (req, res) => {
        const comments = Comment.findById(req.params.id);
    });

export default commentRouter;