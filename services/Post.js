import Post from '../Model/Post.js';
import User from '../Model/User.js';
import uploadFilesToCloudinary from '../cloudinary/utils/uploadfile.js';

const PostService = {
    addPost: async (userId, description, files) => {
        try {
            const cloudinaryUrls = await uploadFilesToCloudinary(files) || [];
            let user = await User.findOne({ _id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            const post = await Post.create({
                userId: userId,
                description,
                imageUrls: cloudinaryUrls,
                privateStatus: false,
                comment: [],
            });
            user.posts.push(post._id);
            await user.save();
            return post._id;
        } catch (error) {
            throw error;
        }
    },

    getPostById: async (postId) => {
        try {
            const post = await Post.findOne({ _id: postId }).select('comment likes');
            return post;
        } catch (error) {
            throw error;
        }
    },

    deletePost: async (postId) => {
        try {
            const post = await Post.findById({ _id: postId });
            if (!post) {
                throw new Error('Post not found');
            }
            await User.updateMany({ posts: postId }, { $pull: { posts: postId } });
            await Post.deleteOne({ _id: post._id });
        } catch (error) {
            throw error;
        }
    },

    updatePostDescription: async (postId, description) => {
        try {
            const post = await Post.findOne({ _id: postId });
            post.description = description;
            await post.save();
        } catch (error) {
            throw error;
        }
    },

    updatePostVisibility: async (postId, visibility) => {
        console.log(postId)
        try {
            const post = await Post.findOne({ _id: postId });
            post.privateStatus = visibility;
            await post.save();
        } catch (error) {
            throw error;
        }
    },

    likePost: async (postId, userId) => {
        try {
            const post = await Post.findOne({ _id: postId });
            const userLikedIndex = post.likesIn.get(userId.toString());

            if (userLikedIndex === undefined && !post.likes.includes(userId)) {
                post.likes.push(userId);
                post.likesIn.set(userId.toString(), post.likes.length - 1);
            } else {
                post.likes.splice(userLikedIndex, 1);
                post.likesIn.delete(userId.toString());
            }

            await post.save();
        } catch (error) {
            throw error;
        }
    },

    getSpecificPostData: async (userId) => {
        try {
            const userData = await Post.find(
                { userId },
                { likes: 1, comment: 1 }
            ).exec();

            return userData;
        } catch (error) {
            throw error;
        }
    },
};

export default PostService;
