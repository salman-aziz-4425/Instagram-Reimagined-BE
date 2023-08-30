import FollowService from "../services/followers.services.js";

const FollowOperations = {
  followRequest: async (req, res) => {
    const { senderId, receiverId, status } = req.body;
    try {
      if (senderId === receiverId) {
        res.status(400).send("You can't send a follow request to yourself.");
      } else {
        const message = await FollowService.sendFollowRequest(senderId, receiverId, status);
        res.json({ message: "Follow request sent successfully.", result: message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to send follow request', errorMessage: error.message });
    }
  },

  acceptRequest: async (req, res) => {
    const { loggedInUserId, requestedUserId, status } = req.body;
    try {
      const message = await FollowService.acceptFollowRequest(loggedInUserId, requestedUserId, status);
      res.status(200).json({ message: "Follow request accepted.", result: message });
    } catch (error) {
      res.status(500).json({ error: 'Failed to accept follow request', errorMessage: error.message });
    }
  },

  rejectRequest: async (req, res) => {
    const { loggedInUserId, requestedUserId } = req.body;
    try {
      const message = await FollowService.rejectFollowRequest(loggedInUserId, requestedUserId);
      res.status(200).json({ message: "Follow request rejected.", result: message });
    } catch (error) {
      res.status(500).json({ error: 'Failed to reject follow request', errorMessage: error.message });
    }
  },

  getFollowingPosts: async (req, res) => {
    const loggedInUserId = req.params.userId;
    try {
      const followingPosts = await FollowService.getFollowingPosts(loggedInUserId);
      res.json(followingPosts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve following posts', errorMessage: error.message });
    }
  },

  getFollowingStories: async (req, res) => {
    const loggedInUserId = req.params.id;
    try {
      const followingStories = await FollowService.getFollowingStories(loggedInUserId);
      res.json(followingStories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve following stories', errorMessage: error.message });
    }
  },

  getFollowers: async (req, res) => {
    try {
      const userFollower = JSON.parse(req.query.userFollower);
      const followers = await FollowService.getFollowers(userFollower);
      res.json(followers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve followers', errorMessage: error.message });
    }
  }
};

export default FollowOperations;
