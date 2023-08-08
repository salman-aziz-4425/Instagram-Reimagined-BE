import User from '../Model/User.js';
import Post from '../Model/Post.js';
import Story from '../Model/Story.js';

const FollowService = {
  sendFollowRequest: async (senderId, receiverId, status) => {
    const [sender, receiver] = await Promise.all([
      User.findOne({ _id: senderId }),
      User.findOne({ _id: receiverId })
    ]);


    sender.following.push({
      user: receiver._id,
      status: status
    });

    await sender.save();

    receiver.followers.push({
      user: sender._id,
      status: status
    });

    await receiver.save();

    return 'Follow request sent successfully.';
  },

  acceptFollowRequest: async (loggedInUserId, requestedUserId, status) => {
    const updateOperations = [
      {
        updateOne: {
          filter: { _id: loggedInUserId, 'followers.user': requestedUserId },
          update: {
            $set: { 'followers.$.status': status }
          }
        }
      },
      {
        updateOne: {
          filter: { _id: requestedUserId, 'following.user': loggedInUserId },
          update: {
            $set: { 'following.$.status': status }
          }
        }
      }
    ]

    await User.bulkWrite(updateOperations);
    return 'Request accepted';
  },
  rejectFollowRequest: async (loggedInUserId, requestedUserId) => {
    const updateOperations = [
      {
        updateOne: {
          filter: { _id: loggedInUserId },
          update: {
            $pull: { followers: { user: requestedUserId } }
          }
        }
      },
      {
        updateOne: {
          filter: { _id: requestedUserId },
          update: {
            $pull: { following: { user: loggedInUserId } }
          }
        }
      }
    ];

    await User.bulkWrite(updateOperations);

    return 'Request rejected';
  },
  getFollowingPosts: async (loggedInUserId) => {
    const followingUserIds = await User.find({
      _id: loggedInUserId,
      'following.status': 'accepted'
    }).distinct('following.user');

    followingUserIds.push(loggedInUserId);

    const followingPosts = await Post.find({
      userId: { $in: followingUserIds }
    })
      .populate({
        path: 'userId',
        select: 'username profilePictureUrl followers'
      })
      .sort({ createdAt: -1 })
      .exec();

    return followingPosts;
  },
  getFollowingStories: async (loggedInUserId) => {
    const followingUserIds = await User.find({
      _id: loggedInUserId,
      'following.status': 'accepted'
    }).distinct('following.user');

    followingUserIds.push(loggedInUserId);

    const followingStories = await Story.find({
      userId: { $in: followingUserIds }
    })
      .populate({
        path: 'userId',
        select: 'username profilePictureUrl followers'
      })
      .sort({ createdAt: -1 })
      .exec();

    return followingStories;
  },
  getFollowers: async (userIds) => {
    const followers = await User.find({
      _id: { $in: userIds }
    })
      .select('username profilePictureUrl followers following visibility posts')
      .exec();

    return followers;
  }
};

export default FollowService;
