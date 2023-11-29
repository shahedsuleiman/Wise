const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authorize(req, res, next){
    try{
        // const token = req.cookies.token;
        // console.log(req);
        const tokenIndex = req.rawHeaders.indexOf('Authorization');
        console.log(tokenIndex)
            const token = req.rawHeaders[tokenIndex + 1];
            // Now `token` contains the value of the Authorization header
            // Use it as needed in your code
         
            // Handle the case where the Authorization header is not present
          
        console.log(token);
        if ("token" == null){
            res.clearCookie("token");
            res.status(401).json("you need to login first");
        }else {
            
            const user = jwt.verify(token, process.env.SECRET_KEY);
            if (!user.userId){
                res.status(401).json("unauthorized");
            }
            req.user = user;
            next();
        }
    }catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    authorize
};