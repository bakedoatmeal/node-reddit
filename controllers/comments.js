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

// // CREATE Comment
// app.post('/posts/:postId/comments', async (req, res) => {
//   console.log(req.user)
//   // INSTANTIATE INSTANCE OF MODEL
//   const userId = req.user._id;
//   const comment = new Comment(req.body);
//   comment.author = userId;

//   try {
//     await comment.save()
//     const userResult = await User.findById(userId)
//     id = req.params.postId
//     const postResult = await Post.findById(id)
//     console.log({postResult})
//     await postResult.comments.unshift(comment);
//     await postResult.save()
//     console.log({userResult})
//     await userResult.comments.unshift(comment)
//     await userResult.save()
//     return res.redirect(`/posts/${id}`)
//   } catch (err) {
//     console.log('Error: ', err.message);
//   }

// });


  // CREATE Comment
  app.post('/posts/:postId/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment
      .save()
      .then(() => Promise.all([
        Post.findById(req.params.postId),
      ]))
      .then(([post]) => {
        post.comments.unshift(comment);
        return Promise.all([
          post.save(),
        ]);
      })
      .then(() => res.redirect(`/posts/${req.params.postId}`))
      .catch((err) => {
        console.log(err);
      });
  });

}