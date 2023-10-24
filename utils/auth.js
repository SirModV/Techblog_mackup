const AuthToken = (req, res, next) => {

  // if user do not have  session 
  if (!req.session.user_id) {
    
    res.redirect("/login");
  } 
  
  // always go to the next route if already logged in
  else {
    next();
  }
};
module.exports = AuthToken;
