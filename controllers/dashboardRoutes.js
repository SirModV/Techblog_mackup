const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models/modelsettings");
const AuthToken = require("../utils/auth");

// get only user post for dashboard
router.get("/", AuthToken, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at", "post_description"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: { model: User, attributes: ["username"] },
      },
      { model: User, attributes: ["username"] },
    ],
  })
    .then((postdata) => {
      const posts = postdata.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/post/edit/:id", AuthToken, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "title", "created_at", "post_description"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: { model: User, attributes: ["username"] },
      },
      { model: User, attributes: ["username"] },
    ],
  })
    .then((e) => {
      if (e) {
        let t = e.get({ plain: !0 });
        res.render("managepost", { post: t, loggedIn: !0 });
      } else res.status(404).end();
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

module.exports = router;
