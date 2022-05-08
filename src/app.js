const express = require("express");
const path = require("path");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const authRoute = require("./routes/auth.route");
const followRoute = require("./routes/follow.route");
const likeRoute = require("./routes/like.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

require("dotenv").config();
require("./config/passport");
const cookieSession = require("cookie-session");
const passport = require("passport");

const { NotFoundError, InvalidInputError } = require("./utils/errors");

//Swagger
const swaggerSetup = YAML.load("./src/docs/swagger.yaml");

const app = express();
//Passport (Auth)
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["clave"], //clave para encriptar
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

//MongoDB (mongoose)
require("./config/db");

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
  console.log('error\n',err.message);
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  if (err instanceof InvalidInputError) {
    return res.status(400).send(err.message);
  }
  res.status(503).send("Oooops something went wrong, try again");
});

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});
module.exports = app;
