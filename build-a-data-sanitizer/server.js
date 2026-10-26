import express from 'express'
import {join} from "path"
import { inputCleaner, inputValidator } from './middleware.js'

const app = express()

app.get("/", (req, res, next) => {
    res.redirect("/form")
})

app.get("/form", (req, res, next) => {
     const filePath = join("public", "/index.html");
     res.end(filePath)
})

app.post("/submit", inputCleaner, inputValidator, (req, res, next) => {
    console.log('req.body', req.body)
    const {username, comment} = req.body
    console.log('username', username)
    console.log('comment', comment)
    res.json({username, comment})
})

app.listen(3000, console.log('Server is listening at http://localhost:3000'))