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
        },
        {
            username: "ryanhong",
            email: "ryanhong@gmail.com",
        },
        {
            username: "sagetyler",
            email: "sagetyler@gmail.com",
        }
    ]
    const thoughts = [
        {
            thoughtText: 'i am tired',
            username: 'matthewcaleb'
        },
        {
            thoughtText: 'soon it will be over',
            username: 'ryanhong'
        },
        {
            thoughtText: 'you dont get to quit on me',
            username: 'sagetyler'
        }
    ]
    const seedUsers = await User.create(users)
    const seedThoughts = await Thought.create(thoughts)
    
    console.table(seedUsers)
    console.table(seedThoughts)
    console.info('Seeding complete! 🌱');
    process.exit(0);
})
