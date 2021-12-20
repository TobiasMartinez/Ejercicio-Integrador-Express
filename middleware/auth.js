const auth = (req, res, next) => {
    let {admin, name} = res.locals.user;
    if(admin){
        console.log(`Bienvenido admin ${name}`)
    }else{
        console.log(`Bienvenido usuario ${name}`)
    }
    next();
}

module.exports = auth;