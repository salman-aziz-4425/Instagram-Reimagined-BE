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
	comment: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]]
})

const Post = mongoose.model('Post', postSchema)

export default Post
