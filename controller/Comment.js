import Post from '../Model/Post.js'
import User from '../Model/User.js'
import Comment from '../Model/Comment.js'

const CommentOperations = {
	addComment: async (req, res) => {
		const { postId, userId, description } = req.body

		try {
			const postExists = await Post.findOne({ _id: postId })
			const userExists = await User.findOne({ _id: userId })

			if (!postExists || !userExists) {
				return res.status(404).json({ error: 'Invalid postId or userId' })
			}

			const newComment = new Comment({ postId, userId, description })
			postExists.comment.push(newComment._id)
			await newComment.save()
			await postExists.save()
			return res.status(201).json(newComment)
		} catch (err) {
			return res.status(500).json({ error: 'Failed to add comment' })
		}
	},
	getComment: async (req, res) => {
		const { postId } = req.query
		try {
			const post = await Post.findOne({ _id: postId }).populate({
				path: 'comment',
				model: 'Comment',
				populate: {
					path: 'userId',
					model: 'User',
					select: 'username profilePictureUrl'
				}
			})

			res.status(200).send({
				comments: post.comment.sort((a, b) => a - b),
				postImages: post.imageUrls,
				authorId: post.userId
			})
		} catch {
			res.status(500).send([])
		}
	},
	deleteComment: async (req, res) => {
		const { commentId } = req.query
		try {
			const comment = await Comment.deleteOne({ _id: commentId })
			if (!comment) {
				return res.status(404).json({ error: 'Comment not found' })
			}
			await Post.updateMany(
				{ comment: commentId },
				{ $pull: { comment: commentId } }
			)

			res.status(200).json({ message: 'Comment deleted successfully' })
		} catch (err) {
			console.log(err)
			res.status(500).json({ error: 'Failed to delete comment' })
		}
	},
	updateComment: async (req, res) => {
		const { commentId, description } = req.body
		try {
			const comment = await Comment.findOne({ _id: commentId })
			if (!comment) {
				return res.status(404).json({ error: 'Comment not found' })
			}
			comment.description = description
			await comment.save()
			res.status(200).json({ message: 'Comment update successfully' })
		} catch (err) {
			console.log(err)
			res.status(500).json({ error: 'Failed to update comment' })
		}
	}
}

export default CommentOperations
