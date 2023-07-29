import CommentService from "../services/Comment.js"

const CommentOperations = {
	addComment: async (req, res) => {
		const { postId, userId, description } = req.body;
		try {
			const newComment = await CommentService.addComment(postId, userId, description);
			res.status(201).json(newComment);
		} catch (error) {
			res.status(500).json({ error: 'Failed to add comment' });
		}
	},
	getComment: async (req, res) => {
		const { postId } = req.query;
		try {
			const commentData = await CommentService.getCommentData(postId);
			res.status(200).json(commentData);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	deleteComment: async (req, res) => {
		const { commentId } = req.query;
		try {
			const message = await CommentService.deleteComment(commentId);
			res.status(200).json({ message });
		} catch (error) {
			res.status(500).json({ error: 'Failed to delete comment' });
		}
	},
	updateComment: async (req, res) => {
		const { commentId, description } = req.body;
		try {
			const message = await CommentService.updateComment(commentId, description);
			res.status(200).json({ message });
		} catch (error) {
			res.status(500).json({ error: 'Failed to update comment' });
		}
	}
}

export default CommentOperations
