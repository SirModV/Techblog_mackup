const {DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

// need user mpdel for reference
const User = require('./UserModel');

class Post extends Model{}

Post.init({id:{type:DataTypes.INTEGER,allowNull:!1,primaryKey:!0,autoIncrement:!0},
  title:{type:DataTypes.STRING,allowNull:!1},
  post_description:{type:DataTypes.STRING(1000),allowNull:!1},
  user_id:{type:DataTypes.INTEGER,references:{model:"user",key:"id"}}},
  {sequelize,underscored:!0,freezeTableName:!0,modelName:"post"}),
  
  module.exports=Post;
