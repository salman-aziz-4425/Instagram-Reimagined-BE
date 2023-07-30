// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv'
import fs from 'fs'
import Post from '../Model/Post.js'
import User from '../Model/User.js'
import mongoose from 'mongoose'

const PostOperations = {
	addPost: async (req, res) => {
		const { userId, description } = req.body
		const arrayUrls = req.files.map(
			(image) => 'http://localhost:3000/uploads/' + image.filename
		)

		const session = await mongoose.startSession()
		session.startTransaction()

		try {
			let user = await User.findOne({ _id: userId }).session(session)
			if (!user) {
				throw new Error('User not found')
			}
			if (user.posts.length > 10) {
				throw new Error('posts limit exceed')
			}
			const post = await Post.create(
				[
					{
						userId: userId,
						description,
						imageUrls: arrayUrls,
						privateStatus: false,
						comment: []
					}
				],
				{ session }
			)

			user.posts.push(post[0]._id)
			await user.save()

			await session.commitTransaction()
			session.endSession()

			res.status(200).send({
				message: 'Post inserted',
				id: post[0]._id
			})
		} catch (error) {
			await session.abortTransaction()
			session.endSession()

			req.files.map((img) => fs.unlinkSync(img.path))
			res.status(500).send(error.message)
		}
	},
	deletePost: async (req, res) => {
		const { postId } = req.query
		try {
			const post = await Post.findById({ _id: postId })
			if (!post) {
				return res.status(404).json({ error: 'Post not found' })
			}
			await User.updateMany({ posts: postId }, { $pull: { posts: postId } })
			await Post.deleteOne({ _id: post._id })
			res.status(200).json({ message: 'Post deleted successfully' })
		} catch (error) {
			console.error('Error deleting post:', error.message)
			res.status(500).json({ error: 'Server error' })
		}
	},
	updatePost: async (req, res) => {
		const { postId, description } = req.body
		try {
			const post = await Post.findOne({ _id: postId })
			post.description = description
			await post.save()
			res.status(200).send('description updated')
		} catch {
			res.status(500).send('description not updated')
		}
	},
	updatePostVisibility: async (req, res) => {
		const { postId, visibility } = req.body
		console.log(postId)
		try {
			const post = await Post.findOne({ _id: postId })
			post.privateStatus = visibility
			await post.save()
			res.status(200).send('visibility updated')
		} catch {
			res.status(500).send('visibility not updated')
		}
	}
}

export default PostOperations
