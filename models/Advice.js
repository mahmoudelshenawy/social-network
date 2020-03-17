const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//user + profile
const AdviceSchema = new mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	topic: {
		type: String,
		required: true
	},
	advice: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Advice = mongoose.model("advice", AdviceSchema);
