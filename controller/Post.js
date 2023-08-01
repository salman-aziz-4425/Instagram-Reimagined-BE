// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv'
import fs from 'fs'
import mongoose from 'mongoose'
import Post from '../Model/Post.js'
import User from '../Model/User.js'

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
	getPost: async (req, res) => {
		const { postId } = req.query

		try {
			const post = await Post.findOne({ _id: postId }).select('comment likes')
			console.log(post)
			res.status(200).send(post)
		} catch {
			res.status(500).send([])
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
		try {
			const post = await Post.findOne({ _id: postId })
			post.privateStatus = visibility
			await post.save()
			res.status(200).send('visibility updated')
		} catch {
			res.status(500).send('visibility not updated')
		}
	},
	likepost: async (req, res) => {
		const { postId, userId } = req.body
		try {
			const post = await Post.findOne({ _id: postId })
			if (!post.likes.includes(userId)) {
				post.likes.push(userId)
			} else {
				post.likes = post.likes.filter((userid) => userid.toString() !== userId)
			}
			await post.save()
			res.status(200)
		} catch {
			res.status(500)
		}
	},
	getSpecificPostData: async (req, res) => {
		const userId = req.query.userId

		try {
			const userData = await Post.find(
				{ userId },
				{ likes: 1, comment: 1 }
			).exec()

			if (!userData) {
				return res.status(404).json({ error: 'User data not found' })
			}

			res.json(userData)
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' })
		}
	}
}

export default PostOperations
