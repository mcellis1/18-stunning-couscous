const router = require('express').Router()
const {
    getThoughts,
    getOneThought,
    addThought,
    updateThought,
    removeThought
} = require('../../controllers/thoughtController')

// get all thoughts
router.route('/').get(getThoughts)
// post to create a new thought dont forget to push the created thoughts id to the associated uiusers thoughts array field
.post(addThought)

// get a single thought by its id
router.route('/:thoughtId').get(getOneThought)
// put to update a thought by its id
.put(updateThought)
// delete to remove a thought by its id
.delete(removeThought)

// /api/thoughts/:thoughtId/reactions post to create a reaction stored in a single thoughts reactions array field

// delete to pull and remove a reaction by the readctions reactionid value

module.exports = router
