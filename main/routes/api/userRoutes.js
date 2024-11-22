const router = require('express').Router()
const {
    getUsers,
    getOneUser,
    addUser,
    editUser,
    deleteUser,
    addFriend,
    removeFriend
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

// post to add a new friend to a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend)
// delete to remove a friend from a user's friend list
.delete(removeFriend)

module.exports = router
