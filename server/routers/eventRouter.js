import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import Event from "../model/eventModel.js";
import QRCode from 'qrcode';
import User from "../model/userModel.js";

const enrolled = (user, eventId) => {
    let found=false;
    user.events.map( async (event) => {
        if (event.valueOf() === eventId) found=true;
    })
    return found;
}

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
        const events = await Event.find({});
        res.json(events);
    })
    .post(async (req, res) => {
        const { name, description, startDate, endDate, fees, location, image } = req.body;

        if (startDate && endDate && startDate > endDate) {
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

eventRouter.route("/myEvents")
    .get(async (req, res) => {
        const user = await User.findById(req.user.data);
        const eventId = user.events;
        const events = await Event.find({ _id: { $in: eventId } }).exec();
        res.json(events);
    })

eventRouter.route(`/:id`)
    .get(async (req, res) => {
        const event = await Event.findById(req.params.id);
        res.json(event);
    })


eventRouter.route(`/:id/enroll`)
    .get(async (req, res) => {
        const user = await User.findById(req.user.data).exec();

        if (user) {
            console.log(enrolled(user, req.params.id));
            if (enrolled(user, req.params.id)) {
                return res.status(202).json({ msg: "You are already enrolled in this event" });
            } else {
                user.events.push(req.params.id);
                user.save();
                res.status(200).json(user);
            }
        } else {
            res.status(404).send("User not found");
        }
    })


export default eventRouter;