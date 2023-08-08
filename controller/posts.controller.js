import PostService from "../services/posts.services.js";

const PostOperations = {
  addPost: async (req, res) => {
    const { userId, description } = req.body;
    try {
      const postId = await PostService.addPost(userId, description, req.files);
      res.status(201).json({ message: 'Post inserted', postId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add post', errorMessage: error.message });
    }
  },

  getPost: async (req, res) => {
    const { postId } = req.query;
    try {
      const post = await PostService.getPostById(postId, req.user.userId);
      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve post', errorMessage: error.message });
    }
  },

  deletePost: async (req, res) => {
    const { postId } = req.query;
    try {
      await PostService.deletePost(postId);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post', errorMessage: error.message });
    }
  },

  updatePost: async (req, res) => {
    const { postId, description } = req.body;
    try {
      await PostService.updatePostDescription(postId, description, req.user.userId);
      res.status(200).json({ message: 'Description updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update description', errorMessage: error.message });
    }
  },

  updatePostVisibility: async (req, res) => {
    const { postId, visibility } = req.body;
    try {
      await PostService.updatePostVisibility(postId, visibility);
      res.status(200).json({ message: 'Visibility updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update visibility', errorMessage: error.message });
    }
  },

  likePost: async (req, res) => {
    const { postId, userId } = req.body;
    try {
      await PostService.likePost(postId, userId);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },

  getSpecificPostData: async (req, res) => {
    const userId = req.params.userId;
    try {
      const userData = await PostService.getSpecificPostData(userId);
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default PostOperations;
