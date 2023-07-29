// eslint-disable-next-line no-unused-vars
import UserService from '../services/user.js'

const UserOperations = {
	Registeration: async (req, res) => {
		try {
			const user = req.body
			const savedUser = await UserService.registerUser(user)
			res.status(201).json(savedUser)
		} catch (error) {
			res.status(500).json({ error: 'Registration failed' })
		}

	},

	Login: async (req, res) => {
		const { phoneNumber, password } = req.query
		try {
			const result = await UserService.loginUser(phoneNumber, password)
			res.status(200).json({
				message: 'Login successful',
				user: result.user,
				token: result.token
			})
		} catch (error) {
			res.status(500).json({ error: 'Login failed' })
		}
	},
	updateProfilePic: async (req, res) => {
		const { userId } = req.body
		try {
			await UserService.updateProfilePicture(userId, req.files)
			res.status(200).send('Image uploaded successfully')
		} catch (error) {
			res.status(500).send('Image not uploaded')
		}
	},
	searchUser: async (req, res) => {
		try {
			const { searchTerm } = req.query
			if (!searchTerm || searchTerm.trim() === '') {
				return res.status(400).json({ error: 'Invalid search term' })
			}
			const searchResults = await UserService.searchUser(searchTerm)
			res.json(searchResults)
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	},
	updatePageVisibility: async (req, res) => {
		const { userId, visibility } = req.body
		try {
			await UserService.updatePageVisibility(userId, visibility)
			res.status(200).send('Visibility updated')
		} catch {
			res.status(500).send('Visibility not updated')
		}
	}
}

export default UserOperations
