const connection = require('../config/connection')
const { User, Thought, Reaction } = require('../models')
connection.on('error', (err) => err)

connection.once('open', async () => {
    console.log('connected')
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray()
    if (userCheck.length) {
        await connection.dropCollection('users')
    }
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray()
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts')
    }
    let reactionsCheck = await connection.db.listCollections({ name: 'reactions' }).toArray()
    if (reactionsCheck.length) {
        await connection.dropCollection('reactions')
    }
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
    const seedUsers = await User.create(users)
    
    console.table(seedUsers)
    console.info('Seeding complete! 🌱');
    process.exit(0);
})
