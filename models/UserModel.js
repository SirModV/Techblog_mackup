const { DataTypes, Model } = require('sequelize');

const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');



class User extends Model{verifyPassword(s){return bcrypt.compareSync(s,this.password)}}

User.init({id:{type:DataTypes.INTEGER,allowNull:!1,primaryKey:!0,autoIncrement:!0},
  email:{type:DataTypes.STRING,allowNull:!1,unique:!0,validate:{isEmail:!0}},
  username:{type:DataTypes.STRING,allowNull:!1},
  password:{type:DataTypes.STRING,allowNull:!1,validate:{len:[3]}}},

  // this executes when new user created ###hashing password
{hooks:{beforeCreate:async e=>(e.password=await bcrypt.hash(e.password,12),e)},
sequelize,timestamps:!1,
underscored:!0,
freezeTableName:!0,
modelName:"user"});
module.exports = User;
