const router = require('express').Router();
const { Comment } = require('../../models/modelsettings');
const AuthToken = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll().then(n=>res.json(n)).catch(n=>{res.status(500).json(n)});
});

router.post('/', AuthToken, (req, res) => {
  if (req.session) {
    Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.postid
    }).then(commentdata => res.json(commentdata)).catch(err => {
        res.status(400).json(err);
      });
  }
});



module.exports = router;
