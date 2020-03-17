const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	issue: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	responses: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			response: {
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

module.exports = Issue = mongoose.model("issue", IssueSchema);
