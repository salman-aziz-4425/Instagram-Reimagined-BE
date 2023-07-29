import FollowService from "../services/Follow.js";

const FollowOperations = {
	FollowRequest: async (req, res) => {
		const { senderId, receiverId, status } = req.body;
		try {
			const message = await FollowService.sendFollowRequest(senderId, receiverId, status);
			res.json({ message });
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}

	},
	acceptRequest: async (req, res) => {
		const { LogedInUserId, requestedUserID, status } = req.body;
		try {
			const message = await FollowService.acceptFollowRequest(LogedInUserId, requestedUserID, status);
			res.status(200).send(message);
		} catch (error) {
			res.status(500).send('Request not accepted ');
		}
	},
	rejectRequest: async (req, res) => {
		const { LogedInUserId, requestedUserID } = req.body;
		try {
			const message = await FollowService.rejectFollowRequest(LogedInUserId, requestedUserID);
			res.status(200).send(message);
		} catch (error) {
			res.status(500).send('Request not rejected ');
		}
	},

	getfollowingPost: async (req, res) => {
		const loggedInUserId = req.query._id;
		try {
			const followingPosts = await FollowService.getFollowingPosts(loggedInUserId);
			res.json(followingPosts);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	getFollowingStories: async (req, res) => {
		const loggedInUserId = req.query._id;
		try {
			const followingStories = await FollowService.getFollowingStories(loggedInUserId);
			res.json(followingStories);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
	getFollowers:async (req,res)=>{
		try{
			const userFollower=JSON.parse(req.query.userFollower)
			const followers=await FollowService.getFollowers(userFollower)
			res.json(followers)
		}catch{
			res.status(500).send()
		}
	}
}

export default FollowOperations
