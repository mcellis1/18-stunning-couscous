const router = require('express').Router()
const {
    getUsers,
    getOneUser,
    addUser,
    editUser,
    deleteUser
} = require('../../controllers/userController')

// get all users
router.route('/').get(getUsers)
// post a new user
.post(addUser)

// get a single user by its id
router.route('/:userId').get(getOneUser)
// put to update a user by its id
.put(editUser)
// delete to remove a user, and remove its associated thoughts when deleted
.delete(deleteUser)
// /api/users/:userId/friends/:friendId post to add a new friend to a user's friend list

// delete to remove a friend from a user's friend list

module.exports = router
