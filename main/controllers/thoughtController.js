const { Thought, User } = require('../models')

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // get a single thought by its id
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
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
            const thought = await Thought.create(req.body)
            await User.findOneAndUpdate(
                { username: thought.username },
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
            )
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
    },
    // post to create a reaction stored in a single thoughts reactions array field
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            if (!reaction) {
                return res.status(404).json({ message: 'no thought found with this id' })
            }
            res.json(reaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete to pull and remove a reaction by the readctions reactionid value
    async removeReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $pull: {
                        reactions: {
                            _id: req.params.reactionId
                        }
                    }
                },
                { runValidators: true, new: true }
            )
            if (!reaction) {
                return res.status(404).json({ message: 'no reaction found with this id' })
            }
            res.json(reaction)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
