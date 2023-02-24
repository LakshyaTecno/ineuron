const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const serverConfig = require("./configs/serverConfig");
const mongoose = require("mongoose");
const dbConfig = require("./configs/dbconfig");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connected to mongodb");
});

db.once("open", () => {
  console.log("connected to mongodb");
});

require("./routes/item.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log("server started at port number ", serverConfig.PORT);
});
