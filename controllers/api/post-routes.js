const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models/modelsettings');
const AuthToken = require('../../utils/auth');
const { getAllItems, getItemById } = require('../queryHelper');

router.get('/', (req, res) => {
  getAllItems().then(postdata => res.json(postdata)).catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', AuthToken, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_description: req.body.post_description
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(postdata => {
      if (!postdata) {
        res.status(404).json({ message: 'post not found' });
        return;
      }
      res.json(postdata);
    }).catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  getItemById(req.params.id).then(postdata => {
      if (!postdata) {
        res.status(404).json({ message: 'post not found' });
        return;
      }
      res.json(postdata);
    }).catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', AuthToken, (req, res) => {
  Post.create({
    title: req.body.title,
    post_description: req.body.post_description,
    user_id: req.session.user_id
  }).then(postdata => res.json(postdata)).catch(err => {
      res.status(500).json(err);
    });
});



router.delete('/:id', AuthToken, (req, res) => {
  
  console.log(req.params.id);

 

  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(postdata => {
      if (!postdata) {
        res.status(404).json({ message: ' post not found' });
        return;
      }
      res.json(postdata);
    }) .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
