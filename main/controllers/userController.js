const { ObjectId } = require('mongoose').Types
const { User, Thought, Reaction } = require('../models')

module.exports = {
// get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
// get a single userr by its id
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v')
            if (!user) {
                return res.status(404).json({ message: 'no student found with this id' })
            }
            res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
// post a new user

// put to upddate a user by its id

// delete to remove a user, and remove its associated thoughts when deleted

// /api/users/:userId/friends/:friendId post to add a new friend to a user's friend list

// delete to remove a friend from a user's friend list
}