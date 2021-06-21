require("dotenv").config();

const http = require("http");
const { urlencoded, json } = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const hbs = require("express-hbs");
const { initRouter } = require("./config/routes");

const app = express();

const server = http.createServer(app);
//const viewsDir = "./views";
const partialsDir = "./views/partials";
const layoutsDir = "./views/layouts";

const port = process.env.PORT || 4000;

app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.express4({
    partialsDir: partialsDir,
    defaultLayout: layoutsDir + "/default.hbs",
    layoutsDir: layoutsDir,
    extname: ".hbs",
  })
);
//app.set("views", viewsDir);
app.use("/public", express.static("public"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
initRouter(app);

server.listen(port, () => console.log(`Hot singles in your area - find them on localhost:"${port}"`));
