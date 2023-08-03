import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
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
    descriptions: {
        type:[String],
        required: true
    },
    expiryData: {
        type: [Date],
        default: Date.now() + 24 * 60 * 60 * 1000,
    }
})

const Story = mongoose.model('Story', storySchema)

export default Story
