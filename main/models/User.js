const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email is required'],
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
                },
                message: 'please enter a valid email'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('user', userSchema)

module.exports = User;
