const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("./auth/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/Profile");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "avatar"]
		);
		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
	"/",
	[
		auth,
		[
			check("status", "Status is required")
				.not()
				.isEmpty(),
			check("skills", "Skills is required")
				.not()
				.isEmpty(),
			check("degree", "add your degree")
				.not()
				.isEmpty(),
			check("studyField", "add you field of study")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			location,
			status,
			skills,
			degree,
			studyField,
			facebook,
			twitter,
			linkedin
		} = req.body;

		//Build profile Object
		const profileField = {};
		//1- add the user
		profileField.user = req.user.id;
		if (company) profileField.company = company;
		if (location) profileField.location = location;
		if (status) profileField.status = status;
		if (skills)
			profileField.skills = skills.split(",").map(skill => skill.trim());
		if (degree) profileField.degree = degree;
		if (studyField) profileField.studyField = studyField;

		//Build social object
		profileField.social = {};
		if (facebook) profileField.social.facebook = facebook;
		if (twitter) profileField.social.twitter = twitter;
		if (linkedin) profileField.social.linkedin = linkedin;
		try {
			//using upsert option (create new doc if no match is found);
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileField },
				{ new: true, upsert: true, useFindAndModify: false }
			);
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);
// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", ["name", "avatar"]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id
		}).populate("user", ["name", "avatar"]);
		if (!profile) return res.status(400).json({ msg: "profile not found" });
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Profile not found" });
		}
		res.status(500).send("Server Error");
	}
});
module.exports = router;
