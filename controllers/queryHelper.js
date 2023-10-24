// getting all model & their config
const { User, Post, Comment } = require("../models/modelsettings");
const getAllItems = async (auth = false) => {
  if (auth) {
    return Post.findAll({
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
    });
  } else {
    return Post.findAll({
      attributes: ["id", "title", "created_at", "post_description"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: { model: User, attributes: ["username"] },
        },
        { model: User, attributes: ["username"] },
      ],
    });
  }
};

const getItemById = (id) => {
  return Post.findOne({
    where: { id: id },
    attributes: ["id", "title", "created_at", "post_description"],
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: { model: User, attributes: ["username"] },
      },
    ],
  });
};

module.exports = { getAllItems, getItemById };
