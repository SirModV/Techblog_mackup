const router = require('express').Router();
const { User, Post, Comment } = require('../../models/modelsettings');
const AuthToken = require('../../utils/auth');



// user registration route
router.post('/', (req, res) => {
  if (!req.body.username || !req.body.email || ! req.body.password) {
    console.log('please fill all the fields');
    return
  }
  User.create({username:req.body.username,email:req.body.email,password:req.body.password}).then(userdata=>{req.session.save(()=>{req.session.user_id=userdata.id,req.session.username=userdata.username,req.session.loggedIn=!0,res.json(userdata)})});
});

router.post('/login', (req, res) => {
  User.findOne({where:{email:req.body.email}}).then(userdata=>{if(!userdata){res.status(400).json({message:"user not found!"});return}
  let e=userdata.verifyPassword(req.body.password);
  if(!e){res.status(400).json({message:"Incorrect password!"});
  return}
  req.session.save(()=>{req.session.user_id=userdata.id,req.session.username=userdata.username,req.session.loggedIn=!0,res.json({user:userdata,message:"login successfull!"})})});
});

router.post('/logout', AuthToken, (req, res) => {
  req.session.loggedIn?req.session.destroy(()=>{res.status(204).end()}):res.status(404).end();
});



module.exports = router;
