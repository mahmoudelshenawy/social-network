const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("./auth/auth");
const User = require("../models/User");
// @route  GET   auth
//@description ==> for the front end to know the user
// @access      Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server error");
	}
});
// @route  POST  auth
//@description ==> to get the token
// @access      Public
router.post(
	"/",
	[
		check("email", "please include a valid email").isEmail(),
		check("password", "password is required").exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "invalid email or password" }] });
			}
			const isMatched = await bcrypt.compare(password, user.password);
			if (!isMatched) {
				return res
					.status(400)
					.json({ errors: [{ msg: "invalid email or password" }] });
			}
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 36000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);
module.exports = router;
