import mongoose from 'mongoose';
import User from '../Model/User.js';
import Post from '../Model/Post.js';
import Story from '../Model/Story.js';

const FollowService = {
    sendFollowRequest: async (senderId, receiverId, status) => {
        try {
            const sender = await User.findOne({ _id: senderId });
            const receiver = await User.findOne({ _id: receiverId });

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
        } catch (error) {
            throw error;
        }
    },

    acceptFollowRequest: async (loggedInUserId, requestedUserId, status) => {
        try {
            const loggedInUser = await User.findOne({ _id: loggedInUserId });
            const requestedUser = await User.findOne({ _id: requestedUserId });

            const loggedInUserFollowerIndex = loggedInUser.followers.findIndex(follower =>
                follower.user.equals(new mongoose.Types.ObjectId(requestedUserId))
            );

            if (loggedInUserFollowerIndex !== -1) {
                loggedInUser.followers[loggedInUserFollowerIndex].status = status;
            }

            const requestedUserFollowingIndex = requestedUser.following.findIndex(followingUser =>
                followingUser.user.equals(new mongoose.Types.ObjectId(loggedInUserId))
            );

            if (requestedUserFollowingIndex !== -1) {
                requestedUser.following[requestedUserFollowingIndex].status = status;
                await loggedInUser.save();
                await requestedUser.save();
            }

            return 'Request accepted';
        } catch (error) {
            throw error;
        }
    },

    rejectFollowRequest: async (loggedInUserId, requestedUserId) => {
        try {
            const loggedInUser = await User.findOne({ _id: loggedInUserId });
            const requestedUser = await User.findOne({ _id: requestedUserId });

            const loggedInUserFollowerIndex = loggedInUser.followers.findIndex(follower =>
                follower.user.equals(new mongoose.Types.ObjectId(requestedUserId))
            );

            const requestedUserFollowingIndex = requestedUser.following.findIndex(followingUser =>
                followingUser.user.equals(new mongoose.Types.ObjectId(loggedInUserId))
            );

            if (loggedInUserFollowerIndex !== -1 && requestedUserFollowingIndex !== -1) {
                loggedInUser.followers.splice(loggedInUserFollowerIndex, 1);
                requestedUser.following.splice(requestedUserFollowingIndex, 1);

                await loggedInUser.save();
                await requestedUser.save();
            }

            return 'Request rejected';
        } catch (error) {
            throw error;
        }
    },

    getFollowingPosts: async (loggedInUserId) => {
        try {
            const loggedInUser = await User.findById(loggedInUserId).exec();
            const followingUsers = loggedInUser.following
                .filter(follow => follow.status === 'accepted')
                .map(follow => follow.user);

            followingUsers.push(loggedInUser);

            const followingPosts = await Post.find({
                userId: { $in: followingUsers }
            })
                .populate({
                    path: 'userId',
                    select: 'username profilePictureUrl followers'
                })
                .sort({ createdAt: -1 })
                .exec();

            return followingPosts;
        } catch (error) {
            throw error;
        }
    },

    getFollowingStories: async (loggedInUserId) => {
        try {
            const loggedInUser = await User.findById(loggedInUserId).exec();
            const followingUsers = loggedInUser.following
                .filter(follow => follow.status === 'accepted')
                .map(follow => follow.user);

            followingUsers.push(loggedInUser);

            const followingStories = await Story.find({
                userId: { $in: followingUsers }
            })
                .populate({
                    path: 'userId',
                    select: 'username profilePictureUrl followers'
                })
                .sort({ createdAt: -1 })
                .exec();

            return followingStories;
        } catch (error) {
            throw error;
        }
    },
    getFollowers:async (userIds) => {
        try {
            const followers = await User.find({
                _id: { $in:userIds}
            })
            .select('username profilePictureUrl followers following visibility posts')
            .exec();
    
            return followers;
        } catch (error) {
            throw error;
        }
    }
};

export default FollowService;
