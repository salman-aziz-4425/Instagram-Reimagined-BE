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
			validator: function (v) {
				return /^\d{11}$/.test(v)
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
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
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
