function user(req, res, next){  
    res.locals.user = {
        name: "Tobias",
        id: 40032,
        admin: true
    }
    next();
};


module.exports = user;