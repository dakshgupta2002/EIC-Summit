import 'dotenv/config'
import { Router } from "express";
import bcrypt from "bcrypt";
import { Auth } from "two-step-auth"
import User from "../model/userModel.js";
const userRouter = Router();

userRouter.route('/register')
        .post(async (req, res) => {
                const { name, email, password, phone, institiute } = req.body;
                const exists = await User.findOne({ email: email }).exec();
                console.log(exists)
                if (exists != null) {
                        res.status(409).send("User already exists");
                        return;
                }
                //send otp to the email
                const auth = await Auth(email, process.env.COPMPANY_NAME);
                console.log(auth.OTP)


        })

userRouter.route('/register/verify')
        .post((req, res) => {
                // original otp and received otp
                const { name, email, password, phone, institiute, otp } = req.body;

                //if matched, then create user
                const encryptPassword = await bcrypt.hash(password, 10);
                console.log(encryptPassword)
                                
                // const newUser = new User({
                //         name: name,
                //         email: email,
                //         password: encryptPassword,
                //         phone: phone,
                //         institiute: institiute
                // });
                // const token = jwt.sign(
                //         { user_id: user._id, email },
                //         process.env.TOKEN_KEY,
                //         {
                //           expiresIn: "2h",
                //         }
                //       );
                //       // save user token
                //       user.token = token;
                // newUser.save();
        })


// userRouter.route('/login')
// .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         next(); 
// })
// .post( (req, res) => {
//         User.findOne({email: req.body.email})
//                 .then((user) => {
//                         if(!user) {
//                                 res.status(400).json({"success:": false, "error": "User not found"});
//                         } else {
//                                 user.comparePassword(req.body.password, (err, isMatch) => {
//                                         if(err) {
//                                                 res.status(400).json({"success:": false, "error": err});
//                                         } else if(isMatch) {
//                                                 res.status(200).json({"success:": true, "user": user});
//                                         } else {
//                                                 res.status(400).json({"success:": false, "error": "Wrong password"});
//                                         }
//                                 });
//                         }
//                 })
//                 .catch((err) => {
//                         res.status(400).json({"success:": false, "error": err});
//                 });
// })


export default userRouter;