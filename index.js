const express = require("express");
const morgan = require("morgan");
const startUpDebugger = require("debug")("app:startup");
const config = require("config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger("Morgan enabled...");
}

app.use("/", require("./routes/landing"));
app.use("/api/genres", require("./routes/genres"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
