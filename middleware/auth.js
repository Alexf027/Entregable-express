const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
    const token = req.headers.authorization;
   jwt.verify(token, process.env.SECRET_KEY, (error, decode) => { 
      if(error){
        return res.status(400).json({ error: "Token invalido"})
      }else{
        req.data = decode;
         next();
      }
   })
}

module.exports = authJWT;