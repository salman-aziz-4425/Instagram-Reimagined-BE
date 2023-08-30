import Posts from "../Model/Post.js";
import Comments from "../Model/Comment.js";

const commentsDeleteUpdateAuth = async (req, res, next) => {
    try {
        const comment = await Comments.findOne({ _id: req.query.commentId || req.body.commentId });
        const post = await Posts.findOne({ _id: comment.postId });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.userId.toString() === req.user.userId) {
            next();
        } else {
            res.status(403).json({ error: "You are not authorized to perform this action" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export { commentsDeleteUpdateAuth };
