const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`Mongoose connected to: ${db.connection.host}:${db.connection.port}`);
    } catch(err) { 
        console.log(err)
        process.exit(1)
    }
}


module.exports = connectDB