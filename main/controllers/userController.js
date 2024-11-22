const { ObjectId } = require('mongoose').Types
const { User, Thought, Reaction } = require('../models')

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v')
            res.json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // get a single user by its id
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
            if (!user) {
                return res.status(404).json({ message: 'no student found with this id' })
            }
            res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // post a new user
    async addUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // put to update a user by its id
    async editUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            ).select('-__v')
            if (!user) {
                res.status(404).json({ message: 'no user with this id found' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete to remove a user, and remove its associated thoughts when deleted
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })
            if (!user) {
                res.status(404).json({ message: 'no user with this id found' })
            }
            await User.deleteMany({ _id: { $in: user.thoughts } })
            res.json({ message: 'user and thoughts deleted' })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // post to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            ).select('-__v')
            if (!user) {
                return res.status(404).json({ message: 'no user found with this id' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            ).select('-__v')
            if (!user) {
                return res.status(404).json({ message: 'no user found with this id' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}