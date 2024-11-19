const { User } = require('../models')

const users = [
    {
        username: "matthewcaleb",
        email: "matthewcaleb@gmail.com",
        // thoughts: [1, 2],
        // friends: [1, 2]
    },
    {
        username: "ryanhong",
        email: "ryanhong@gmail.com",
        // thoughts: [3, 4],
        // friends: [3, 4]
    },
    {
        username: "sagetyler",
        email: "sagetyler@gmail.com",
        // thoughts: [5, 6],
        // friends: [5, 6]
    }
]
// const thoughts = [
//     {
//         thoughtText: 'i am not having fun'
//     }
// ]
const seedUsers = () => User.create(users)

module.exports = seedUsers