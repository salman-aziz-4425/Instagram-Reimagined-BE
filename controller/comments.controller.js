import CommentService from "../services/comments.services.js";

const CommentOperations = {
  addComment: async (req, res) => {
    const { postId, userId, description } = req.body;
    try {
      const newComment = await CommentService.addComment(postId, userId, description);
      res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
      res.status(400).json({ error: 'Failed to add comment', errorMessage: error.message });
    }
  },

  getComment: async (req, res) => {
    const { postId } = req.query;
    try {
      const commentData = await CommentService.getCommentData(postId);
      res.status(200).json(commentData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve comments', errorMessage: error.message });
    }
  },

  deleteComment: async (req, res) => {
    const { commentId } = req.query;
    try {
      const message = await CommentService.deleteComment(commentId);
      res.status(200).json({ message: 'Comment deleted successfully', result: message });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment', errorMessage: error.message });
    }
  },

  updateComment: async (req, res) => {
    const { commentId, description } = req.body;

    try {
      const message = await CommentService.updateComment(commentId, description);
      res.status(200).json({ message: 'Comment updated successfully', result: message });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update comment', errorMessage: error.message });
    }
  },
};

export default CommentOperations;
