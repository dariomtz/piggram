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

function getFromHeader(req,res,next){
  let token = req.header('auth');
  if(token && !req.user){
    var decoded = jwt.verify(token,process.env.SIGN);
    userController.findByPassportId(decoded.token).then((user)=>{
      req.user = user;
      next();
    }).catch(err=>{
      next();
    })
  }
  else{
    next();
  }
  
}

function test(req,res,next){
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Credentials", "true");
  req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  req.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next(req,res);
}

module.exports = { isAuthenticated, isAuthorized, isRegistered, getFromHeader,test};
