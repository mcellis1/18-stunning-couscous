const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    }
)

const Thought = model('thought', thoughtSchema)

module.exports = Thought
