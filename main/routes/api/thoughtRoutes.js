const router = require('express').Router()
const {
    getThoughts,
    getOneThought,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController')

// get all thoughts
router.route('/').get(getThoughts)
// post to create a new thought
.post(addThought)

// get a single thought by its id
router.route('/:thoughtId').get(getOneThought)
// put to update a thought by its id
.put(updateThought)
// delete to remove a thought by its id
.delete(removeThought)

// post to create a reaction stored in a single thoughts reactions array field
router.route('/:thoughtId/reactions').post(addReaction)

// delete to pull and remove a reaction by the readctions reactionid value
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router
