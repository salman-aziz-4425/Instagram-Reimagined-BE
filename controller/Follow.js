import mongoose from 'mongoose'
import User from '../Model/User.js'
import Post from '../Model/Post.js'

const FollowOperations = {
	FollowRequest: async (req, res) => {
		const { senderId, receiverId, status } = req.body

		try {
			const Sender = await User.findOne({ _id: senderId })
			const reciever = await User.findOne({ _id: receiverId })

			Sender.following.push({
				user: reciever._id,
				status: status
			})
			await Sender.save()
			reciever.followers.push({
				user: Sender._id,
				status: status
			})
			await reciever.save()

			res.json({ message: 'Follow request sent successfully.' })
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	},
	acceptRequest: async (req, res) => {
		const { LogedInUserId, requestedUserID, status } = req.body

		try {
			const LoginUser = await User.findOne({ _id: LogedInUserId })
			const requestedUser = await User.findOne({ _id: requestedUserID })
			const index = LoginUser.followers.findIndex((follower) =>
				follower.user.equals(new mongoose.Types.ObjectId(requestedUserID))
			)
			if (index !== -1) {
				LoginUser.followers[index].status = status
			}

			const requestedUserIndex = requestedUser.following.findIndex(
				(followingUser) =>
					followingUser.user.equals(new mongoose.Types.ObjectId(LogedInUserId))
			)
			if (requestedUserIndex !== -1) {
				requestedUser.following[requestedUserIndex].status = status
				await LoginUser.save()
				await requestedUser.save()
				res.status(200).send('Request accepted')
			}
		} catch (error) {
			res.status(500).send('Request not accepted ')
		}
	},
	rejectRequest: async (req, res) => {
		const { LogedInUserId, requestedUserID } = req.body

		try {
			const loggedInUser = await User.findOne({ _id: LogedInUserId })
			const requestedUser = await User.findOne({ _id: requestedUserID })
			const loggedInUserFollowerIndex = loggedInUser.followers.findIndex(
				(follower) =>
					follower.user.equals(new mongoose.Types.ObjectId(requestedUserID))
			)
			const requestedUserFollowingIndex = requestedUser.following.findIndex(
				(followingUser) =>
					followingUser.user.equals(new mongoose.Types.ObjectId(LogedInUserId))
			)
			if (
				loggedInUserFollowerIndex !== -1 &&
				requestedUserFollowingIndex !== -1
			) {
				loggedInUser.followers.splice(loggedInUserFollowerIndex, 1)
				requestedUser.following.splice(requestedUserFollowingIndex, 1)

				await loggedInUser.save()
				await requestedUser.save()

				res.status(200).send('Request rejected')
			} else {
				res.status(404).send('Request not found')
			}
		} catch (error) {
			res.status(500).send('Error rejecting request')
		}
	},

	getfollowingPost: async (req, res) => {
		const loggedInUserId = req.query._id
		try {
			const loggedInUser = await User.findById(loggedInUserId).exec()
			const followingUsers = loggedInUser.following
				.filter((follow) => follow.status === 'accepted')
				.map((follow) => follow.user)
			const followingPosts = await Post.find({
				userId: { $in: followingUsers }
			})
				.populate({
					path: 'userId',
					select: 'username profilePictureUrl followers'
				})
				.sort({ createdAt: -1 })
				.exec()
			res.json(followingPosts)
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}
}

export default FollowOperations
