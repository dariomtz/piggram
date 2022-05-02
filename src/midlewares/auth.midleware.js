

function isAuthenticated(req, res, next){
    if(req.user != null && req.user['passportID'] != null){
        next();
    }
    else{
        res.status(401).send({error:'Not authorized'});
    }
}

module.exports = {isAuthenticated};