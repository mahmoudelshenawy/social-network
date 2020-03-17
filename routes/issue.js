const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("./auth/auth");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Issue = require("../models/Issue");
// @route    POST api/issue
// @desc     Add Issue
// @access   Private
router.post(
	"/",
	[
		auth,
		[
			check("issue", "please add your issue")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		//check for errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select("-password");
			const newIssue = new Issue({
				issue: req.body.issue,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});
			const issue = await newIssue.save();
			res.json(issue);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route    GET api/issue
// @desc     get all Issues
// @access   Private
router.get("/", auth, async (req, res) => {
	try {
		const issues = await Issue.find().sort({ date: -1 });
		res.json(issues);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
// @route    DELETE api/issue/:id
// @desc     Delete an issue
// @access   Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const issue = await Issue.findById(req.params.id);
		if (!issue) {
			return res.status(404).json({ msg: "issue not found" });
		}
		//check for user
		if (issue.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}
		await issue.remove();
		res.json({ msg: "issue deleted" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "issue not found" });
		}
		res.status(500).send("server error");
	}
});
// @route    POST api/issue/response/:id
// @desc     respond on a issue
// @access   Private
router.post(
	"/response/:id",
	[
		auth,
		[
			check("response", "please add your response")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select("-password");
			const issue = await Issue.findById(req.params.id);
			const newResponse = {
				response: req.body.response,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};
			issue.responses.unshift(newResponse);
			await issue.save();
			res.json(issue.responses);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("server error");
		}
	}
);
// @route    DELETE api/issue/response/:id/:response_id
// @desc     Delete response
// @access   Private
router.delete("/response/:id/:response_id", auth, async (req, res) => {
	try {
		const issue = await Issue.findById(req.params.id);

		//pull out the response
		const response = issue.responses.find(
			res => res.id === req.params.response_id
		);

		//make sure that the response exists
		if (!response) {
			return res.status(404).json({ msg: "response does not exist" });
		}
		//check for the user
		if (response.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "user not authorized" });
		}
		//get the removed index
		const removedIndex = issue.responses
			.map(res => res.id)
			.indexOf(req.params.response_id);
		issue.responses.splice(removedIndex, 1);
		await issue.save();
		res.json(issue.responses);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server error");
	}
});
module.exports = router;
