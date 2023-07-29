import dotenv from 'dotenv'
import fs from 'fs'
import User from '../Model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uploadFilesToCloudinary from '../cloudinary/utils/uploadfile.js'

const UserService = {
    registerUser: async (user) => {
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
                visibility: false
            })

            const savedUser = await newUser.save()
            return savedUser
        } catch (error) {
            throw error
        }
    },

    loginUser: async (phoneNumber, password) => {
        try {
            const user = await User.findOne({ phoneNumber }).populate({
                path: 'posts',
                populate: [{ path: 'userId', model: 'User' }]
            })

            if (!user) {
                throw new Error('User not found')
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                throw new Error('Invalid password')
            }
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            })
            return { user, token }
        } catch (error) {
            throw error
        }
    },

    updateProfilePicture: async (userId, files) => {
        try {
            const user = await User.findOne({ _id: userId })
            const cloudinaryUrl = await uploadFilesToCloudinary(files)
            user.profilePictureUrl = cloudinaryUrl[0]
            await user.save()
        } catch (error) {
            throw error
        }
    },
    searchUser: async (searchTerm) => {
      try {
          const regex = new RegExp(searchTerm, 'i')
          const searchResults = await User.find({ username: regex }).populate('posts')
          return searchResults
      } catch (error) {
          throw error
      }
  },

  updatePageVisibility: async (userId, visibility) => {
      try {
          const user = await User.findOne({ _id: userId })
          user.visibility = visibility
          await user.save()
      } catch (error) {
          throw error
      }
  }
}

export default UserService
