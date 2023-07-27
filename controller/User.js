// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv'
import User from '../Model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserOperations = {
	Registeration: async (req, res) => {
		const user = req.body
		try {
			const newUser = new User({
				username: user.username,
				fullName: user.fullName,
				phoneNumber: user.phoneNumber,
				password: user.password,
				bio: user.bio || '',
				posts: user.post || [],
				profilePictureUrl: user.profilePictureUrl || ''
			})

			const savedUser = await newUser.save()
			res.status(201).json(savedUser)
		} catch (error) {
			console.error('Error during registration:', error)
			if (error.name === 'ValidationError' && error.errors) {
				return res.status(422).json({ error: error.errors })
			}
			res.status(500).json({ error: 'Registration failed' })
		}
	},

	Login: async (req, res) => {
		const { phoneNumber, password } = req.query
		try {
			const user = await User.findOne({ phoneNumber })
			if (!user) {
				return res.status(404).json({ error: 'User not found' })
			}
			const isPasswordValid = await bcrypt.compare(password, user.password)
			if (!isPasswordValid) {
				return res.status(401).json({ error: 'Invalid password' })
			}
			// eslint-disable-next-line no-undef
			const token = jwt.sign({ userId: user._id }, process.env.Secret_KEY, {
				expiresIn: '1h'
			})
			res.status(200).json({
				message: 'Login successful',
				user,
				token
			})
		} catch (error) {
			console.error('Error during login:', error)
			res.status(500).json({ error: 'Login failed' })
		}
	}
}

export default UserOperations
