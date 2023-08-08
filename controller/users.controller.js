import UserService from '../services/users.services.js';

const UserOperations = {
  registration: async (req, res) => {
    try {
      const user = req.body;
      const result = await UserService.registerUser(user);
      res.status(201).json({
        message: 'Registration successful',
        user: result.savedUser,
        token: result.token
      });
    } catch (error) {
      res.status(400).json({ error: 'Failed to register user', errorMessage: error.message });
    }
  },

  login: async (req, res) => {
    const { phoneNumber, password } = req.query;
    try {
      const result = await UserService.loginUser(phoneNumber, password);
      res.status(200).json({
        message: 'Login successful',
        user: result.user,
        token: result.token
      });
    } catch (error) {
      res.status(401).json({ error: 'Login failed', errorMessage: error.message });
    }
  },

  updateProfilePic: async (req, res) => {
    const { userId } = req.body;
    try {
      await UserService.updateProfilePicture(userId, req.files);
      res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to upload profile picture', errorMessage: error.message });
    }
  },

  searchUser: async (req, res) => {
    try {
      const { searchTerm } = req.params;
      if (!searchTerm || searchTerm.trim() === '') {
        return res.status(400).json({ error: 'Invalid search term' });
      }
      const searchResults = await UserService.searchUser(searchTerm);
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search for users', errorMessage: error.message });
    }
  },

  updatePageVisibility: async (req, res) => {
    const { userId, visibility } = req.body;
    try {
      await UserService.updatePageVisibility(userId, visibility);
      res.status(200).json({ message: 'Page visibility updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update page visibility', errorMessage: error.message });
    }
  }
};

export default UserOperations;
