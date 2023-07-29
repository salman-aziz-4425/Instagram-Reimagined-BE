import Post from '../Model/Post.js';
import User from '../Model/User.js';
import Comment from '../Model/Comment.js';

const CommentService = {
    addComment: async (postId, userId, description) => {
        try {
            const postExists = await Post.findOne({ _id: postId });
            const userExists = await User.findOne({ _id: userId });

            if (!postExists || !userExists) {
                throw new Error('Invalid postId or userId');
            }

            const newComment = new Comment({ postId, userId, description });
            postExists.comment.push(newComment._id);
            await newComment.save();
            await postExists.save();
            return newComment;
        } catch (error) {
            throw error;
        }
    },

    getCommentData: async (postId) => {
        try {
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
            };
        } catch (error) {
            throw error;
        }
    },

    deleteComment: async (commentId) => {
        try {
            const comment = await Comment.deleteOne({ _id: commentId });
            if (!comment) {
                throw new Error('Comment not found');
            }

            await Post.updateMany(
                { comment: commentId },
                { $pull: { comment: commentId } }
            );

            return 'Comment deleted successfully';
        } catch (error) {
            throw error;
        }
    },

    updateComment: async (commentId, description) => {
        try {
            const comment = await Comment.findOne({ _id: commentId });
            if (!comment) {
                throw new Error('Comment not found');
            }

            comment.description = description;
            await comment.save();

            return 'Comment updated successfully';
        } catch (error) {
            throw error;
        }
    }
};

export default CommentService;
