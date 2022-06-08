const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

  app.get('/', async (req, res) => {
    const currentUser = req.user;
    try {
      const posts = await Post.find({}).lean().populate('author');
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
  app.post('/posts/new', async (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const post = new Post(req.body);
      post.author = userId;
      post.upVotes = [];
      post.downVotes = [];
      post.voteScore = 0;
      //post.save().then(() => res.redirect('/'));
      try {
        console.log('step 1')
        await post.save()
        console.log('step 2')
        const result = await User.findById(userId)
        console.log('step 3', result)
        await result.posts.unshift(post)
        await result.save()
        console.log(result.posts)
        return res.redirect(`/posts/${post._id}`)
      } catch(err) {
          console.log('Error: ', err.message);
      }
    } else {
      return res.status(401); //unauthorized
    }
  })
    // SHOW - LOOK UP THE POST
  app.get('/posts/:id', async (req, res) => {

    const currentUser = req.user;
    try {
      //const post = await Post.findById(req.params.id).lean().populate({ path:'comments', populate: { path: 'author' } }).populate('author')
      const post = await Post.findById(req.params.id).populate('comments').lean()
      //console.log(typeof post._id)
      return res.render('posts-show', {post, currentUser})
    } catch(err) {
      console.log(err.message);
    }
  });

    // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    const currentUser = req.user;
    try {
      //const posts = await Post.find({subreddit: req.params.subreddit}).lean().populate('author')
      const posts = await Post.find({subreddit: req.params.subreddit}).lean()
      return res.render('posts-index', {posts, currentUser}) 
    } catch {
      console.log(err)
    }
  });

  app.put('/posts/:id/vote-up', (req, res) => {
    Post.findById(req.params.id).then(post => {
      post.upVotes.push(req.user._id);
      post.voteScore += 1;
      post.save();
  
      return res.status(200);
    }).catch(err => {
      console.log(err);
    })
  });
  
  app.put('/posts/:id/vote-down', (req, res) => {
    Post.findById(req.params.id).then(post => {
      post.downVotes.push(req.user._id);
      post.voteScore -= 1;
      post.save();
  
      return res.status(200);
    }).catch(err => {
      console.log(err);
    });
  });
}
