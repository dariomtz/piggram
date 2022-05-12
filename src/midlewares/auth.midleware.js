const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");

function isAuthenticated(req, res, next) {
  if (req.user !== null && req.user !== undefined) {
    next();
  } else {
    res.status(401).send({ error: "Not logged in" });
  }
}

function isRegistered(req,res,next){
  if (req.user === null || req.user === undefined) {
    res.status(401).send({ error: "Not logged in" });
  } else {
    if(req.user.resgitrationCompleted){
      next();
    }
    else{
      res.status(401).send({ error: "User not completed" });
    }
  }
}

function isAuthorized(req, res, next) {
  // TODO: avoid users deleting content that does not belong to them
  // like post or comments
  next();
}


module.exports = { isAuthenticated, isAuthorized, isRegistered};
