import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import uploadFilesToCloudinary from '../cloudinary/utils/uploadfile.js'
import mail from '../utils/mail.js'
import User from '../Model/User.js'

const UserService = {
  registerUser: async (user) => {

    const newUser = new User({
      username: user.username,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email:user.mail,
      password: user.password,
      bio: user.bio || '',
      posts: user.post || [],
      profilePictureUrl: user.profilePictureUrl || '',
      followers: [],
      following: [],
      visibility: false
    })

    const savedUser = await newUser.save()
    const token = jwt.sign({ userId: savedUser._id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    })
    mail(user.mail,{
      phoneNumber:user.phoneNumber,
      password:user.password
    })
    return { savedUser, token }

  },

  loginUser: async (phoneNumber, password) => {

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
      expiresIn: '24h'
    })
    return { user, token }

  },

  updateProfilePicture: async (userId, files) => {
    const user = await User.findOne({ _id: userId })
    if(user){
      const cloudinaryUrl = await uploadFilesToCloudinary(files)
      user.profilePictureUrl = cloudinaryUrl[0]
      await user.save()
    }
    else{
      return
    }
  
  },
  searchUser: async (searchTerm) => {
    const regex = new RegExp(searchTerm, 'i')
    const searchResults = await User.find({ username: regex }).populate('posts')
    return searchResults

  },

  updatePageVisibility: async (userId, visibility) => {
    const user = await User.findOne({ _id: userId })
    user.visibility = visibility
    await user.save()
  }
}

export default UserService
