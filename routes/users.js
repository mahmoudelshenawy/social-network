const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

//models
const User = require("../models/User");

// @route  POST  api/user
//@description  register user
// @access      Public
router.post(
	"/",
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "please add a valid email").isEmail(),
		check(
			"password",
			"at least 6 characters with numbers, letters and symbols"
		).isLength({ min: 6 }),
		check("speciality", "add your speciality")
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password, location, speciality } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ errors: [{ msg: "user already exists" }] });
			}
			const randomNum = Math.floor(Math.random() * 100 + 1);
			const imgURL = `https://randomuser.me/api/portraits/men/${randomNum}.jpg`;

			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm"
			});
			//create new user account
			user = new User({
				name,
				email,
				password,
				avatar,
				location,
				speciality
			});
			//hash the password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			//save the user in the data base
			await user.save();
			//get the token in return
			const payload = {
				user: {
					id: user.id
				}
			};
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 360000 },
				(err, token) => {
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("server error");
		}
	}
);
module.exports = router;
