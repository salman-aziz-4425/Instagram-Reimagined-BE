import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		validate: {
			validator: function () {
				return mongoose.Types.ObjectId.isValid(this.userId)
			},
			message: 'Invalid userId. Must be a valid ObjectId.'
		}
	},
	imageUrls: {
		type: [String],
		required: true
	},
	description: {
		type: String,
		required: true
	},
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	likesIn: {
		type: Map,
		of: Number,
		default: {},
	},
	privateStatus: { type: Boolean, default: false },
	comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	createdAt: {
		type: Date,
		default: Date.now
	}
})

postSchema.index({ userId: 1, createdAt: -1 })
postSchema.index({ likes: 1 })

const Post = mongoose.model('Post', postSchema)

export default Post
