import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: [3, 'Too short name'],
		maxlength: 30
	},
	fullName: {
		type: String,
		required: true,
		trim: true,
		maxlength: 100
	},
	phoneNumber: {
		type: Number,
		required: true,
		unique: true,
		validate: {
			validator: function () {
				return /^\d{10}$/.test(this.phoneNumber)
			},
			message: 'Phone number must be 11 digits'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	bio: {
		type: String,
		maxlength: 200
	},
	profilePictureUrl: {
		type: String,
		trim: true
	},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
	visibility: {
		type: Boolean
	},
	followers: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true
			},
			status: {
				type: String,
				enum: ['pending', 'accepted', 'rejected'],
				default: ''
			}
		}
	],
	following: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true
			},
			status: {
				type: String,
				enum: ['pending', 'accepted', 'rejected'],
				default: ''
			}
		}
	],
	stories: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }
	]
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()

	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (error) {
		next(error)
	}
})
const User = mongoose.model('User', userSchema)

export default User
