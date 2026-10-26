// Starter file — add your code here
const fs = require("fs")
const fsPromises = require('fs/promises')
const crypto = require("crypto")
const os = require('os')
const path = require('path')


// console.log(fs)
//## readFileSync (synchronously)
// console.log(fs.readFileSync('assets/poem.txt')) returns a raw buffer
// const data = fs.readFileSync('assets/poem.txt', {encoding: "utf8"}) // prints encoded string
// console.log(data)

//## readFile (for use with async)
// fs.readFile('assets/poem.txt', {encoding: "utf8"}, (err, data) => {
//     console.log(data)
// })

// //** Promises with fs */
// async function main() {
//     const data = await fsPromises.readFile('assets/poem.txt', {encoding: "utf8"})
    
//     console.log(data)     
// }

// main()

// ## Write file sync (synchronously )
// fs.writeFileSync('assets/output.txt', "Hello, freeCodeCamp!")

// ** append file *
// fs.appendFileSync('assets/output.txt', "\nIzzy says hi!")

//** check if a file or dir exists returns boolean */
// const exists = fs.existsSync("assets/output.txt")
// console.log(exists)

//** fs.readdirSync reads the contents of a directory and returns an array of file and folder names: */
// const entries = fs.readdirSync('assets');
// console.log(entries)

// const buf = Buffer.from('Hello, Node!');
// console.log(buf)
// console.log(buf.toString('hex'))
// console.log(buf.toString('base64'))

//** create a buffer of 8 bytes and fill with ff  */
// const buf = Buffer.alloc(8, 0xff);
// console.log(buf)

// decode this buffer and log the result
// const decoded = Buffer.from("ZnJlZUNvZGVDYW1w", "base64").toString("utf8")
// console.log(decoded)

// ** The crypto module provides cryptographic functionality. One common use is hashing - transforming data into a fixed-length string that cannot be reversed. Use crypto.createHash to create a hash, .update to feed it data, and .digest to get the result:
// const hash = crypto.createHash("sha256").update("freeCodeCamp!").digest("hex");
// console.log(hash)

//** crypto.randomBytes(n) generates n cryptographically strong random bytes and returns them as a Buffer. Calling .toString('hex') on the result gives a random hex string: */

// const random = crypto.randomBytes(16).toString('hex')
// console.log(random)

// const id = crypto.randomUUID();
// console.log(id)

// console.log(os.platform())
// console.log(os.arch())
// console.log(os.hostname())

// console.log(os.totalmem())
// console.log(os.freemem())
// console.log(os.uptime())

// console.log(os.cpus().length)

const filePath = path.join(__dirname, "assets", "poem.txt")
// console.log(filePath)
// console.log(path.basename(filePath)) //- the file name
// console.log(path.dirname(filePath)) //- the containing dir
// console.log(path.extname(filePath)) // - the extention including dot

//** path.resolve and path.join both build paths, but they behave differently when given '..' segments:
// path.join simply concatenates the segments with the separator - it does not resolve the result to an absolute path on its own unless you start with an absolute segment like __dirname.
// path.resolve always returns an absolute path, processing '..' segments against the current working directory. */

// console.log(path.join('assets', "..", 'server.js')) // returns only the filename???
// console.log(path.resolve('assets', "..", 'server.js')) // returns the location of the file???

// const parts = path.parse(filePath);
// console.log(parts);

// console.log(process.version)
// console.log(process.platform)
// console.log(process.env.NODE_ENV)

// run with: node server.js hello world
// console.log(process.argv); // [ '/path/to/node', '/path/to/server.js', 'hello', 'world' ]
// console.log(process.argv[2]); // 'hello'

// process.stdout.write("Hello from stdout\n");
// process.stderr.write("Hello from stderr\n");


// const readable = fs.createReadStream("assets/poem.txt", { encoding: "utf8" });

// readable.on("data", (chunk) => {
//   console.log(chunk);
// });

// readable.on("end", () => {
//   console.log("Done reading");
// });

// const writable = fs.createWriteStream("assets/stream-output.txt");
// writable.write("First chunk\n");
// writable.write("Second chunk\n");
// writable.end();

const readable = fs.createReadStream("assets/poem.txt");
const writable = fs.createWriteStream("assets/stream-output.txt");
readable.pipe(writable);