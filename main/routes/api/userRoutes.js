const router = require('express').Router()
const { getUsers, getOneUser } = require('../../controllers/userController')

// get all users
router.route('/').get(getUsers)
// get a single userr by its id
router.route('/:userId').get(getOneUser)
// post a new user

// put to upddate a user by its id

// delete to remove a user, and remove its associated thoughts when deleted

// /api/users/:userId/friends/:friendId post to add a new friend to a user's friend list

// delete to remove a friend from a user's friend list

module.exports = router
