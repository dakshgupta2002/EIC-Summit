import 'dotenv/config'
import { Router } from "express";
import bcrypt from "bcrypt";
import { Auth } from "two-step-auth"
import User from "../model/userModel.js";
import UserVerify from '../model/userVerify.js';
import jwt from 'jsonwebtoken';

const userRouter = Router();

userRouter.route('/register')
	.all((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Content-Type", "application/json");
		next();
	})
	.post(async (req, res) => {
		//first save user email in userVerify 
		//send otp and if otp verified, then save user email 
		const { email } = req.body;
		const exists = await User.findOne({ email: email }).exec();


		if (exists !== null) {
			res.status(409).json({
				"msg": "User already exists",
				"status": 409
			});
			return;
		}

		//check if already an otp has been sent 
		const oldUserVerify = await UserVerify.findOne({ email: email }).exec();
		if (oldUserVerify !== null) {
			res.status(409).json({
				"msg": "OTP already sent",
				"status": 409
			});
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
		return res.status(200).json({
			"msg": "OTP sent",
			"status": 200
		});
	})

userRouter.route('/register/verify')
	.all((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Content-Type", "application/json");
		next();
	})
	.post(async (req, res) => {

		// accept otp from the user
		const { email, otp } = req.body;

		//check if user exists in temporary db
		const userVerify = await UserVerify.findOne({ email: email }).exec();
		if (userVerify == null) {
			res.status(404).json({
				"msg": "User not found"
			});
			return;
		}

		//check if otp is correct
		if (otp !== userVerify.otp) {
			res.status(401).json({ "msg": "OTP is incorrect" });
			return;
		}

		//verify and create user account
		userVerify.verified = true;
		userVerify.save();
		return res.json({
			"msg": "OTP verified",
			"status": 200
		});
	});


userRouter.route("/register/create")
	.all((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Content-Type", "application/json");
		next();
	})
	.post(async (req, res) => {
		const { name, email, password, institute } = req.body;
		//check if this email is verified 
		const userVerify = await UserVerify.findOne({ email: email }).exec();
		if (userVerify === null || userVerify.verified === false) {
			res.status(401).json({
				"msg": "User OTP not verified"
			});
			return;
		}

		//hash the password 
		const hashedPassword = bcrypt.hashSync(password, 10);

		const user = new User({
			name: name,
			email: email,
			password: hashedPassword,
			institute: institute
		});

		const token = jwt.sign({ user_id: user._id, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
		user.token = token;

		user.save();

		res.status(200).json({
			user,
			"status": 200
		});
	})

userRouter.route("/login")
	.all((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Content-Type", "application/json");
		next();
	})
	.post(async (req, res) => {
		const { email, password } = req.body;
		const userFound = await User.findOne({ email: email }).exec();
		if (userFound === null) {
			return res.status(401).json({
				"msg": "User not found"
			});
		}
		if (!bcrypt.compareSync(password, userFound.password)) {
			return res.status(401).json({
				"msg": "Password incorrect"
			});
		}
		const token = jwt.sign({ user_id: userFound._id, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
		userFound.token = token;
		userFound.save();

		return res.json({
			userFound,
			"status": 200
		});

	});
export default userRouter;