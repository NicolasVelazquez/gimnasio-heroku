import express from "express"
import cors from "cors"
import gimnasio from "./api/routes/gym.route.js"
import winston from "winston"
import  path from 'path'
import dotenv from "dotenv"
dotenv.config()

winston.add(new winston.transports.File({
    filename: 'app.log',
    handleRejections: true,
    handleExceptions: true
}));

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/gimnasio", gimnasio)
// app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(path.dirname(''), '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(path.dirname(''), 'frontend', 'build', 'index.html'), { root: '.' })
    })
} else {
    app.get('/', (req, res) => {
        res.send("Api running")
    })
}

export default app