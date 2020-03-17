const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const avatarSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "users"
		},
		img: { data: Buffer, contentType: String }
	},
	{
		timestamps: true
	}
);

module.exports = Img = mongoose.model("img", avatarSchema);
