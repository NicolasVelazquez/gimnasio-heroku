import app from "./server.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 5000

mongoose.connect(
    process.env.ATLAS_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})