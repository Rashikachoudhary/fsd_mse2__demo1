const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  const token = req.header("token");

  if(!token) return res.send("No Token");

  try{
    const verified = jwt.verify(token,"secretkey");
    req.user = verified;
    next();
  }catch{
    res.send("Invalid Token");
  }
}