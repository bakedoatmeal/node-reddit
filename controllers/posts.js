const Post = require('../models/post')

module.exports = (app) => {

  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      console.log(posts)
      return res.render('posts-index', {posts})
    } catch(err) {
      console.log(err.message);
    }
  })

  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  // CREATE
  app.post('/posts/new', (req, res) => {
    console.log(req)
    const post = new Post(req.body);
    post.save().then(() => res.redirect('/'));
  })
    // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean()
      return res.render('posts-show', {post})
    } catch(err) {
      console.log(err.message);
    }
  });

    // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({subreddit: req.params.subreddit}).lean()
      return res.render('posts-index', {posts}) 
    } catch {
      console.log(err)
    }
  });
}
