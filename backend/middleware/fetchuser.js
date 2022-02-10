var jwt = require('jsonwebtoken');
const JWT_SECRET = "helloworldthisisamitkumar";

// get the user from the jwt token and if to req obj;
const fetchuser = (req , res , next) => {
  const token = req.header('auth-token');
  if (!token) {
      res.status(401).send({error:"Please authenticate using a valid token , token not find"});
  }
  try {
      const data = jwt.verify(token , JWT_SECRET);
      req.user = data.user;
      next();
  } catch (err) {
    return res.status(401).send({error:"Please authenticate using a valid token"});
  }
}

module.exports = fetchuser;