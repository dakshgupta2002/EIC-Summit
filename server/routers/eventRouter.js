import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import Event from "../model/eventModel.js";

const eventRouter = Router();
eventRouter.route('*')
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    })
eventRouter.route("/")
    .get(async (req, res) => {
        console.log("BACKEND")
        const events = await Event.find({});
        res.json(events);
    })
    .post((req, res) => {
        const { name, description, startDate, endDate, fees, location, image } = req.body;
        console.log("BACKEND")
        if (startDate?.getTime() > endDate?.getTime()) {
            res.status(400).send("Start date cannot be after end date");
            return;
        }
        if (!isAdmin(req, res)) {
            res.status(403).send("You are not authorized to perform this action");
            return;
        }
        const newEvent = new Event({
            host: req.user.data,
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            fees: fees,
            location: location,
            image: image
        });

        newEvent.save();
        res.status(200).json(newEvent);
    })

eventRouter.route(`/:id`)
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    })
    .get(async (req, res) => {
        const event = await Event.findById(req.params.id);
        res.json(event);
    })

eventRouter.route(`/:id/enroll`)
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    })
    .post(async (req, res) => {
        const event = await Event.findById(req.params.id);
        event.enrolled.push(req.user);
        event.save();
        res.json(event);
    })


export default eventRouter;