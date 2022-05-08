require("dotenv").config();
require("./config/passport");
require("./config/db");

const express = require("express");
const path = require("path");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const swaggerSetup = YAML.load("./src/docs/swagger.yaml");
const { NotFoundError, InvalidInputError } = require("./utils/errors");

const authRoute = require("./routes/auth.route");
const followRoute = require("./routes/follow.route");
const likeRoute = require("./routes/like.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

const app = express();

function corsCustom(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
}

app.use(corsCustom);

//Passport (Auth)
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["clave"], //clave para encriptar
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

//Home page
app.get("/", (req, res) => {
  res.status(200).send({ a: "aqui" });
});

//Swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.use("/auth", authRoute);
app.use("/follows", followRoute);
app.use("/likes", likeRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

app.use((err, req, res, next) => {
  console.log("error\n", err.message);
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  if (err instanceof InvalidInputError) {
    return res.status(400).send(err.message);
  }
  res.status(503).send("Oooops something went wrong, try again");
});

module.exports = app;
