const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

// const mongoose = require("mongoose");
//connect to db
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/advice", require("./routes/advice"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/issue", require("./routes/issue"));
app.use("/api", require("./routes/Avatar"));
//serve static assets in products
if (process.env.NODE_ENV === "production") {
	//set the static folder
	app.use(express.static("client/build"));

	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
	// app.get("*", (req, res) => {
	// 	let url = path.join(__dirname, "client/build", "index.html");
	// 	if (!url.startsWith("/app/"))
	// 		// since we're on local windows
	// 		url = url.substring(1);
	// 	res.sendFile(url);
	// });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server start on port 5000"));
