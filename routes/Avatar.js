const router = require("express").Router();
const multer = require("multer");
const Img = require("../models/Avatar");
const fs = require("fs");
const auth = require("./auth/auth");
const User = require("../models/User");
//create storage engine
const storage = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, "uploads/");
	}
});
const upload = multer({ storage: storage });

//Routes
router.post("/img", auth, upload.single("img"), async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		const newImg = new Img();
		newImg.img.data = fs.readFileSync(req.file.path);
		newImg.img.contentType = req.file.mimetype;
		newImg.user = req.user.id;
		newImg.name = user.name;
		const imgProfile = await newImg.save();
		res.json(imgProfile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});

router.get("/img", auth, (req, res) => {
	Img.findOne({ user: req.user.id }, "img createdAt", (err, img) => {
		if (err) res.send(err);
		// console.log(img);
		res.json(img);
	}).sort({ createdAt: "desc" });
});
//get all avatar
router.get("/profiles", async (req, res) => {
	// const img = await Img.findOne({user:req.user.id})
	// Img.find({}, "img createdAt", (err, imgs) => {
	// 	if (err) res.send(err);
	// 	// console.log(img);
	// 	res.json(imgs);
	// }).sort({ createdAt: "desc" });
	const imgs = await Img.find({}).sort({ createdAt: "desc" });
	res.json(imgs);
});
module.exports = router;
