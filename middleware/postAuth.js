import Post from "../Model/Post.js";

const postsOwnerAuth = async (req, res, next) => {
    try {
        const post = await Post.findOne({ _id: req.query.postId || req.body.postId });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.userId.toString() === req.user.userId.toString()) {
            next();
        } else {
            res.status(403).json({ error: "You are not authorized to perform this action on this post" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export { postsOwnerAuth };


