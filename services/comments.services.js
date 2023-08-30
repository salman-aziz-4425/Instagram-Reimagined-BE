import Post from '../Model/Post.js';
import User from '../Model/User.js';
import Comment from '../Model/Comment.js';

const CommentService = {
	addComment: async (postId, userId, description) => {
		
			const postExistsPromise = Post.findOne({ _id: postId });
			const userExistsPromise = User.findOne({ _id: userId });
			const [postExists, userExists] = await Promise.all([postExistsPromise, userExistsPromise]);
			if (!postExists || !userExists) {
				throw new Error('Invalid postId or userId');
			}

			const newComment = new Comment({ postId, userId, description });
			postExists.comment.push(newComment._id);
			const commentsPromise = newComment.save();
			const postsPromise = postExists.save();
			await Promise.all([commentsPromise, postsPromise]);
			return newComment;
	},

	getCommentData: async (postId) => {
			const post = await Post.findOne({ _id: postId }).populate({
				path: 'comment',
				model: 'Comment',
				populate: {
					path: 'userId',
					model: 'User',
					select: 'username profilePictureUrl'
				}
			});

			return {
				comments: post.comment.sort((a, b) => a - b),
				postImages: post.imageUrls,
				authorId: post.userId
			}
	},

	deleteComment: async (commentId) => {
			const comment = await Comment.deleteOne({ _id: commentId });
			if (!comment) {
				throw new Error('Comment not found');
			}

			await Post.updateMany(
				{ comment: commentId },
				{ $pull: { comment: commentId } }
			);

			return 'Comment deleted successfully';
	},

	updateComment: async (commentId, description) => {
			const comment = await Comment.findOne({ _id: commentId });
			if (!comment) {
				throw new Error('Comment not found');
			}

			comment.description = description;
			await comment.save();

			return 'Comment updated successfully';
	}
};

export default CommentService;

//
//add hogaa 