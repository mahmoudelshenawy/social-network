const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("./auth/auth");
const Advice = require("../models/Advice");
const User = require("../models/User");

// @route    POST api/advice
// @desc     Add some hacks and advice
// @access   Private

router.post(
	"/",
	[
		auth,
		[
			check("topic", "please identify your field")
				.not()
				.isEmpty(),
			check("advice", "the advice is missing")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}
		try {
			//search for the user
			const user = await User.findById(req.user.id).select("-password");

			//reference the advice
			const newAdvice = new Advice({
				topic: req.body.topic,
				advice: req.body.advice,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});
			//save the advice in db
			const advice = await newAdvice.save();
			//return the advice
			res.json(advice);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("server Error");
		}
	}
);

// @route    GET api/advice
// @desc     Get all advice
// @access   Private
router.get("/", auth, async (req, res) => {
	try {
		const allAdvice = await Advice.find({}).sort({ date: -1 });
		//return all advice
		res.json(allAdvice);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server error");
	}
});
// @route    GET api/advice/:id
// @desc     Get advice by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
	try {
		const advice = await Advice.findById(req.params.id);
		if (!advice) {
			return res.status(404).json({ msg: "advice not found" });
		}
		res.json(advice);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "advice not found" });
		}
		res.status(500).send("server error");
	}
});
// @route    DELETE api/advice/:id
// @desc     Delete an advice
// @access   Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const advice = await Advice.findById(req.params.id);
		if (!advice) {
			return res.status(404).json({ msg: "advice is not found" });
		}
		//check user
		if (advice.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "you re not authorized" });
		}
		await advice.remove();
		res.json({ msg: "advice removed " });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "post not found " });
		}
	}
	res.status(500).send("server error");
});
// @route    PUT api/advice/like/:id
// @desc     Like an advice
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
	try {
		const advice = await Advice.findById(req.params.id);
		//check if you have been already liked it
		if (
			advice.likes.filter(like => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: "you have already liked it" });
		}
		advice.likes.unshift({ user: req.user.id });
		await advice.save();
		res.json(advice.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server Error");
	}
});
// @route    PUT api/advice/unlike/:id
// @desc     unLike an advice
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
	try {
		const advice = await Advice.findById(req.params.id);
		//check if you have been already unLiked it
		//if the array is empty it means you have not liked it yet
		if (
			advice.likes.filter(like => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: "you have not liked it yet" });
		}
		//Get remove index
		const removedIndex = advice.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id);
		//remove from the likes array
		advice.likes.splice(removedIndex, 1);

		await advice.save();
		res.json(advice.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server Error");
	}
});
// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
	"/comment/:id",
	[
		auth,
		[
			check("text", "you have to write something")
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
			const advice = await Advice.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};
			advice.comments.unshift(newComment);
			await advice.save();
			res.json(advice.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);
// @route    DELETE api/advice/comment/:postId/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
	try {
		const advice = await Advice.findById(req.params.id);
		//pull out comment
		const comment = advice.comments.find(
			comment => comment.id === req.params.comment_id
		);
		//Make sure the comment exists
		if (!comment) {
			return res.status(404).json({ msg: "Comment does not exist" });
		}
		//check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}
		//get the removed index
		const removedIndex = advice.comments
			.map(comment => comment.id)
			.indexOf(req.params.comment_id);

		advice.comments.splice(removedIndex, 1);
		await advice.save();
		res.json(advice.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
module.exports = router;
