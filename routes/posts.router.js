const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createNewPostData = await Posts.create({ title, content });
    return res.status(200).json({
      id: createNewPostData.id,
      title: createNewPostData.title,
      content: createNewPostData.content
    });
  } catch (err) {
    console.error(err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const getAllPostsData = await Posts.findAll({
      attributes: ['id', 'title', 'content']
    });
    return res.status(200).json(getAllPostsData);
  } catch (err) {
    console.error(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    await Posts.update(
      { title, content },
      { where: { id: postId } }
    );
    const updatePostData = await Posts.findOne({
      attributes: ['id', 'title', 'content'],
      where: { id: postId }
    })
    return res.status(200).json(updatePostData);
  } catch (err) {
    console.error(err);
  }
};

const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    await Posts.destroy({ where: { id: postId }});
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
  }
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

module.exports = router;