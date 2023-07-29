import PostService from "../services/Post.js";

const PostOperations = {
	addPost: async (req, res) => {
		const { userId, description } = req.body;
		try {
			const postId = await PostService.addPost(userId, description, req.files);
			res.status(200).json({
				message: 'Post inserted',
				id: postId,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getPost: async (req, res) => {
		const { postId } = req.query;
		try {
			const post = await PostService.getPostById(postId);
			res.status(200).json({ post });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	deletePost: async (req, res) => {
		const { postId } = req.query;
		try {
			await PostService.deletePost(postId);
			res.status(200).json({ message: 'Post deleted successfully' });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	updatePost: async (req, res) => {
		const { postId, description } = req.body;
		try {
			await PostService.updatePostDescription(postId, description);
			res.status(200).send('Description updated');
		} catch (error) {
			res.status(500).send('Description not updated');
		}
	},
	updatePostVisibility: async (req, res) => {
		const { postId, visibility } = req.body;
		try {
			await PostService.updatePostVisibility(postId, visibility);
			res.status(200).send('Visibility updated');
		} catch (error) {
			res.status(500).send('Visibility not updated');
		}
	},

	likepost: async (req, res) => {
		const { postId, userId } = req.body;
		try {
			await PostService.likePost(postId, userId);
			res.status(200).json({ success: true });
		} catch (error) {
			res.status(500).json({ success: false });
		}
	},

	getSpecificPostData: async (req, res) => {
		const userId = req.query.userId;
		try {
			const userData = await PostService.getSpecificPostData(userId);
			res.json(userData);
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}

export default PostOperations
