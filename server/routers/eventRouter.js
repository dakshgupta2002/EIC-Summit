import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import Event from "../model/eventModel.js";

const eventRouter = Router();

eventRouter.route("/")
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    })
    .get( async (req, res) => {
        const events = await Event.find({});
        res.json(events);
    })
    .post((req, res) => {
        const {name, description, startDate, endDate, fees, location, image, likes, qrscan} = req.body;
        if (startDate?.getTime() > endDate?.getTime()) {
            res.status(400).send("Start date cannot be after end date");
            return;
        }
        if (!isAdmin(req, res)) {
            res.status(403).send("You are not authorized to perform this action");
            return;
        }
        const newEvent = new Event({
            name, description, startDate, endDate, fees, location, image, likes, qrscan
        }, req.user);

        newEvent.save();
        res.status(200).json(newEvent);
    })

export default eventRouter;