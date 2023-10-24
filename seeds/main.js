const Users = require('./user');
const Posts = require('./post');
const Comments = require('./comment');
const sequelize = require('../config/connection');

//  function to execute seed to DB
const runseed = async () => {
  await sequelize.sync({
    force: true
  });

  await Users();
  await Posts();
  await Comments();
  process.exit(0);
};

//  run this function to seed
runseed();
