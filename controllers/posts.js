const Post = require('../models/post')

module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    console.log(req)
    const post = new Post(req.body);
    console.log('hello?', post)
    post.save().then(() => res.redirect('/'));
  })


  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      console.log(posts)
      return res.render('posts-index', {posts})
    } catch(err) {
      console.log(err.message);
    }
  })
}
