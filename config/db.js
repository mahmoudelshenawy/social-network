const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const Grid = require("gridfs-stream");
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});
		console.log("connected to db");
	} catch (err) {
		console.error(err.message);

		process.exit(1);
	}
};
// const connectDB = () =>
// 	mongoose.createConnection(db, {
// 		useUnifiedTopology: true,
// 		useNewUrlParser: true,
// 		useCreateIndex: true
// 	});
// mongoose.connect(db);
// let gfs;
// connectDB.once("open", () => {
// 	gfs = Grid(connectDB.db, mongoose.mongo);
// 	gfs.collection("avatars");
// 	console.log("connected to db");
// });
module.exports = connectDB;
