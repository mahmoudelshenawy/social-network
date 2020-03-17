const mongoose = require("mongoose");

//user + profile
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	imgURL: {
		type: String
	},
	location: {
		type: String
	},
	speciality: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model("user", UserSchema);
