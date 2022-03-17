import 'dotenv/config'
import { Router } from "express";
import bcrypt from "bcrypt";
import { Auth } from "two-step-auth"
import User from "../model/userModel.js";
import UserVerify from '../model/userVerify.js';
import jwt from 'jsonwebtoken';

const userRouter = Router();

userRouter.route('/register')
	.post(async (req, res) => {
		//first save user email in userVerify 
		//send otp and if otp verified, then save user email 

		const { email } = req.body;
		const exists = await User.findOne({ email: email }).exec();

		if (exists != null) {
			res.status(409).send("User already exists");
			return;
		}

        //check if already an otp has been sent 
        const oldUserVerify = await UserVerify.findOne({ email: email }).exec();
        if (oldUserVerify != null) {
            res.status(409).send("OTP already sent");
            return;
        }
		//proceed to create temporary user account 

		// 1) Create a new document 
		const userVerify = new UserVerify({
			email: email
		});

		// 2) send otp to the email
		const auth = await Auth(email, process.env.COPMPANY_NAME);

		// 3) encrypt the otp and store in database
        const otp = auth.OTP;
		userVerify.otp = otp;

		userVerify.save();

		// 4) return to the user and wait for the otp to be entered
		res.json(email);
	})

userRouter.route('/register/verify')
	.post(async (req, res) => {

		// accept otp from the user
		const { email, otp } = req.body;

		//check if user exists in temporary db
		const userVerify = await UserVerify.findOne({ email: email }).exec();
		if (userVerify == null) {
			res.status(404).send("User not found");
			return;
		}

		//check if otp is correct
		if (otp !== userVerify.otp) {
			res.status(401).send("OTP is incorrect");
			return;
		}

		//verify and create user account
        userVerify.verified = true;
        userVerify.save();
		return res.json(email);
	});


userRouter.route("/register/create")
	.post(async (req, res) => {
		const { name, email, password, institute } = req.body;
        //hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);
        //check if this email is verified 
        const userVerify = await UserVerify.findOne({ email: email }).exec();
        if (userVerify == null || userVerify.verified===false) {
            res.status(401).send("User OTP not verified");
            return;
        }

		const user = new User({
			name: name,
			email: email,
			password: hashedPassword,
			institute: institute
		});

		const token = jwt.sign({ user_id: user._id, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
		user.token = token;

		user.save();

		res.json(user);
	})

userRouter.route("/login")
    .post(async (req, res) => {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email: email }).exec();
        if (userFound == null) {
            return res.status(401).send("User not found");
        }
        if (password !== userFound.password){
            return res.status(401).send("Password incorrect");
        }
        const token = jwt.sign({ user_id: userFound._id, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        userFound.token = token;
        userFound.save();

        return res.json(userFound);

    });
export default userRouter;