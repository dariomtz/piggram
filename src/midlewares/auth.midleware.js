function isAuthenticated(req, res, next) {
  if (req.user != null && req.user["passportID"] != null) {
    next();
  } else {
    res.status(401).send({ error: "Not authorized" });
  }
}

function isAuthorized(req, res, next) {
  // TODO: avoid users deleting content that does not belong to them
  // like post or comments
  next();
}

module.exports = { isAuthenticated, isAuthorized };
