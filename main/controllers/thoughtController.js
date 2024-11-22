const { Thought, User } = require('../models')

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v')
            res.json(thoughts)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // get a single thought by its id
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v')
            if (!thought) {
                return res.status(404).json({ message: 'no thought found with this id' })
            }
            res.json(thought)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // post to create a new thought dont forget to push the created thoughts id to the associated users thoughts array field
    async addThought(req, res) {
        try {
            const thought = await Thought.create(req.body).select('-__v')
            await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            )
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // put to update a thought by its id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            ).select('-__v')
            if (!thought) {
                res.status(404).json({ message: 'no thought found with that id' })
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete to remove a thought by its id
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if (!thought) {
                res.status(404).json({ message: 'no thought found with this id' })
            }
            res.json({ message: 'thought deleted' })
        } catch (err) {
            res.status(500).json(err)
        }
    }
    // /api/thoughts/:thoughtId/reactions post to create a reaction stored in a single thoughts reactions array field
    
    // delete to pull and remove a reaction by the readctions reactionid value
}
