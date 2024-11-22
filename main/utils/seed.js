const connection = require('../config/connection')
const { User } = require('../models')
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
    const seedUsers = await User.create(users)
    
    console.table(seedUsers)
    console.info('Seeding complete! 🌱');
    process.exit(0);
})
