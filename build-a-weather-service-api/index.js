import express from 'express';
import weatherRouter from './weather.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")))

app.use("/api/weather", weatherRouter)

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.route("/api/data")
    .get((req, res) => {
        res.status(200).json({status: "ok"})
    })
    .post((req, res, next) => {
        res.status(201).json({status: "ok"})
    })

app.get("/api/greet/:name", (req, res, next) => {
    const {name} = req.params
    res.json({name})
})
app.get("/api/info", (req, res, next) => {
    res.json({
        name: "Weather Service API",
        version: "1.0.0",
        endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"]
    })
})
app.get("/api/status", (req, res, next) => {
    res.status(200).json({status: 200})
})
app.get("/docs", (req, res, next) => {
    res.redirect("/api/info")
})

app.listen(PORT, console.log(`Server is listening at port ${PORT}`))