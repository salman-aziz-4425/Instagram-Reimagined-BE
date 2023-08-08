import Post from '../Model/Post.js';
import User from '../Model/User.js';
import uploadFilesToCloudinary from '../cloudinary/utils/uploadfile.js';

const PostService = {

  addPost: async (userId, description, files) => {
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

  },

  getPostById: async (postId, userId) => {
    const post = await Post.findOne({ _id: postId }).select('comment likes userId');
    if (post.userId.toString() !== userId.toString()) {
      throw new Error('User not allowed');
    }
    return post;
  },

  deletePost: async (postId) => {
    const post = await Post.findById({ _id: postId });
    if (!post) {
      throw new Error('Post not found');
    }
    await Promise.all([
      User.updateMany({ posts: postId }, { $pull: { posts: postId } }),
      Post.deleteOne({ _id: post._id })
    ])
  },

  updatePostDescription: async (postId, description, userId) => {

    const post = await Post.findOne({ _id: postId });
    if (post.userId.toString() !== userId.toString()) {
      throw new Error('User not allowed');
    }
    else {
      post.description = description;
      await post.save();
    }
  },

  updatePostVisibility: async (postId, visibility) => {

    const post = await Post.findOne({ _id: postId });
    post.privateStatus = visibility;
    await post.save();

  },

  likePost: async (postId, userId) => {
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
    return

  },

  getSpecificPostData: async (userId) => {
    const userData = await Post.find(
      { userId },
      { likes: 1, comment: 1 }
    ).exec();

    return userData;
  },
};

export default PostService;
