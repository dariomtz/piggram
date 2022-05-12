require("dotenv").config();
require("./config/passport");
require("./config/db");

var cors = require("cors");
const express = require("express");
const path = require("path");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const swaggerSetup = YAML.load("./src/docs/swagger.yaml");
const { NotFoundError, InvalidInputError } = require("./utils/errors");
const http = require("http");
const { Server } = require("socket.io");

const authRoute = require("./routes/auth.route");
const followRoute = require("./routes/follow.route");
const likeRoute = require("./routes/like.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT],
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  },
});

users = [];

io.on("connection", socket => {
  console.log("A new user connected!");

  socket.on("login", ({ name, room }) => {
    const user = { name, room, id: socket.id };
    users.push(user);
    socket.join(user.room);
  });

  socket.on("stream", img => {
    const user = users.find(user => user.id === socket.id);
    socket.to(user.room).emit("stream", img);
  });

  socket.on("end", msg => {
    const user = users.find(user => user.id === socket.id);
    socket.to(user.room).emit("end", msg);
  });
});

var corsOptions = {
  origin: process.env.CLIENT,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

//Passport (Auth)
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SIGN], //clave para encriptar
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Home page
app.get("/", (req, res) => {
  res.status(200).send({ a: "aqui" });
});

//Swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.use("/auth", authRoute);
app.use("/follows", followRoute);
app.use("/like", likeRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

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

module.exports = server;
