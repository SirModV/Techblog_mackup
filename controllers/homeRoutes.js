const router = require('express').Router();
const sequelize = require('../config/connection');

const { getAllItems, getItemById } = require('./queryHelper');


// get post by id
router.get('/post/:id', (req, res) => {
  getItemById(req.params.id).then(postdata => {
      if (!postdata) {
        res.status(404).json(
          { message: 'post not found' }
          );
        return;
      }
      const post = postdata.get({ plain: true });

      res.render('postdetails', {post, loggedIn: req.session.loggedIn,
      });
    }).catch(err => {res.status(500).json(err);
    });
});

// fetch all posts
router.get('/', (req, res) => {
  getAllItems().then(postdata => {
      const posts = postdata.map(post => post.get({ plain: true }));
      res.render('homepage', {posts,loggedIn: req.session.loggedIn,
      });
    }).catch(err => {res.status(500).json(err);
    });
});

router.get("/login",(e,r)=>{if(e.session.loggedIn){r.redirect("/");return}r.render("login")}),
router.get("/signup",(e,r)=>{if(e.session.loggedIn){r.redirect("/");return}r.render("reg")});

module.exports = router;
