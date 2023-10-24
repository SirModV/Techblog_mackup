const { Post } = require('../models');

const postdata = [
  {
    title: 'My new post',
    post_description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia non id fugiat nostrum dolore est. Eveniet ad veniam, nisi rerum eos iure dolorum cupiditate labore earum adipisci corrupti veritatis sint.',
    user_id: 1
  },
  
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
