const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');

module.exports = (app) => {
  //  // CREATE Comment
  // app.post('/posts/:postId/comments', async (req, res) => {
  //   try {
  //       // INSTANTIATE INSTANCE OF MODEL
  //     const comment = new Comment(req.body);
  //     await comment.save()
  //     console.log(req.params.postId)
  //     const post = await Post.findById(req.params.postId).lean()
  //     console.log(post)
  //     post.comments.unshift(comment)
  //     await post.save()
  //     return res.redirect('/')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // });

// CREATE Comment
app.post('/posts/:postId/comments', (req, res) => {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);
  console.log(req.params.postId)

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(() => {
      id = req.params.postId
      return Post.findById(id)
    })
    .then((post) => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.log(err);
    });
});
}