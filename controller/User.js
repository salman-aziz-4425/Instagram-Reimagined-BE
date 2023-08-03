// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv'
import fs from 'fs'
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
				profilePictureUrl: user.profilePictureUrl || '',
				followers: [],
				following: [],
				visibility:false
			})

			const savedUser = await newUser.save()
			res.status(201).json(savedUser)
		} catch (error) {
			if (error.name === 'ValidationError' && error.errors) {
				return res.status(422).json({ error: error.errors })
			}
			res.status(500).json({ error: 'Registration failed' })
		}
	},

	Login: async (req, res) => {
		const { phoneNumber, password } = req.query
		try {
			const user = await User.findOne({ phoneNumber }).populate({
				path: 'posts',
				populate: [{ path: 'userId', model: 'User' }]
			})

			if (!user) {
				return res.status(404).json({ error: 'User not found' })
			}
			const isPasswordValid = await bcrypt.compare(password, user.password)
			if (!isPasswordValid) {
				return res.status(401).json({ error: 'Invalid password' })
			}
			// eslint-disable-next-line no-undef
			const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
				expiresIn: '1h'
			})
			res.status(200).json({
				message: 'Login successful',
				user,
				token
			})
		} catch (error) {
			res.status(500).json({ error: 'Login failed' })
		}
	},
	updateProfilePic: async (req, res) => {
		const { userId } = req.body
		try {
			const user = await User.findOne({ _id: userId })
			user.profilePictureUrl =
				'http://localhost:3000/uploads/' + req.file.filename

			await user.save()
			res.status(200).send('Image uploaded successfully')
		} catch {
			fs.unlinkSync(req.file.path)
			res.status(500).send('Image not uploaded')
		}
	},
	searchUser: async (req, res) => {
		const { searchTerm } = req.query

		if (!searchTerm || searchTerm.trim() === '') {
			return res.status(400).json({ error: 'Invalid search term' })
		}

		try {
			const regex = new RegExp(searchTerm, 'i')
			const searchResults = await User.find({ username: regex }).populate(
				'posts'
			)

			res.json(searchResults)
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	},
	updatePageVisibility: async (req, res) => {
		const { userId, visibility } = req.body
		try {
			const user = await User.findOne({ _id: userId })
			user.visibility = visibility
			await user.save()
			res.status(200).send('visibility updated')
		} catch {
			res.status(500).send('visibility not updated')
		}
	}
}

export default UserOperations
