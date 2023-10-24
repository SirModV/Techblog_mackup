const { DataTypes ,Model } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({id:{type:DataTypes.INTEGER,allowNull:!1,primaryKey:!0,autoIncrement:!0},
  comment:{type:DataTypes.STRING,allowNull:!1},
  user_id:{type:DataTypes.INTEGER,references:{model:"user",key:"id"}},
  post_id:{type:DataTypes.INTEGER,references:{model:"post",key:"id"}}},
  {sequelize,underscored:!0,freezeTableName:!0,modelName:"comment"});

module.exports = Comment;
