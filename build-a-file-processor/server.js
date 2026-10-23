// Starter file — add your code here
const fs = require("fs")

// console.log(fs)
## readFileSync
// console.log(fs.readFileSync('assets/poem.txt')) returns a raw buffer
// const data = fs.readFileSync('assets/poem.txt', {encoding: "utf8"}) // prints encoded string
// console.log(data)

## readFile
fs.readFile('assets/poem.txt', {encoding: "utf8"}, (err, data) => {
    console.log(data)
})