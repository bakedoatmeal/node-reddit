const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');
const User = require('../models/user');
const { post } = require('../app');

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
app.post('/posts/:postId/comments', async (req, res) => {
  console.log(req.user)
  // INSTANTIATE INSTANCE OF MODEL
  const userId = req.user._id;
  const comment = new Comment(req.body);
  comment.author = userId;

  // SAVE INSTANCE OF Comment MODEL TO DB
  // comment
  //   .save()
  //   .then(() => {
  //     id = req.params.postId
  //     return Post.findById(id)
  //   })
  //   .then((post) => {
  //     post.comments.unshift(comment);
  //     return post.save();
  //   })
  //   .then(() => res.redirect('/'))
  //   .catch((err) => {
  //     console.log(err);
  //   });
  try {
    await comment.save()
    const userResult = await User.findById(userId)
    id = req.params.postId
    const postResult = await Post.findById(id)
    console.log({postResult})
    await postResult.comments.unshift(comment);
    await postResult.save()
    console.log({userResult})
    await userResult.comments.unshift(comment)
    await userResult.save()
    return res.redirect(`/posts/${id}`)
  } catch (err) {
    console.log('Error: ', err.message);
  }

});
}