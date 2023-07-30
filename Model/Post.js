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
	privateStatus: { type: Boolean, default: false },
	comment: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]],
	createdAt: {
		type: Date,
		default: Date.now
	}
})

const Post = mongoose.model('Post', postSchema)

export default Post
