const Post = require('../models/post')

module.exports = (app) => {

  app.get('/', async (req, res) => {
    const currentUser = req.user;
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', {posts, currentUser})
    } catch(err) {
      console.log(err.message);
    }
  })

  app.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    res.render('posts-new', {currentUser})
  })

  // CREATE
  app.post('/posts/new', (req, res) => {
    if (req.user) {
      const post = new Post(req.body);
      post.save().then(() => res.redirect('/'));
    } else {
      return res.status(401); //unauthorized
    }
  })
    // LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {

    const currentUser = req.user;
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments')
      console.log(typeof post._id)
      return res.render('posts-show', {post, currentUser})
    } catch(err) {
      console.log(err.message);
    }
  });

    // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    const currentUser = req.user;
    try {
      const posts = await Post.find({subreddit: req.params.subreddit}).lean()
      return res.render('posts-index', {posts, currentUser}) 
    } catch {
      console.log(err)
    }
  });
}
