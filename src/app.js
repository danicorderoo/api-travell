const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const handlerError = require("./utils/middleware/handlerError.js");
const setHeaders = require("./utils/middleware/setHeaders.js");
require("./db.js");

const server = express();

server.name = "API";

//MiddleWares

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(setHeaders);
server.use("/", routes);
server.use(handlerError);

module.exports = server;
