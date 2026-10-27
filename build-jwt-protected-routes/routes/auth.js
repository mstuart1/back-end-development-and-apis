import express from 'express';
import { findByEmail, readUsers, writeUsers } from '../utils/db.js'
import { signToken } from '../utils/jwt.js'
import authenticate from '../middleware/authenticate.js';
import { blacklistToken } from '../utils/token-blacklist.js';

const router = express.Router();

router
    .post("/register", async (req, res, next) => {
        const { email, password } = req.body
        
        if (!email || !password) {
            console.log('missing info')
            res.status(400).json({ message: "Email and password are required" })
            return
        }
        let user = findByEmail(email)
        if (user) {
            console.log('user exists')
            res.status(409).json({ message: "Email already in use." })
            return
        }

        const passwordHash = await bcrypt.hash(password, 10);

        let newUser = {
            id: randomUUID(),
            email,
            passwordHash,
            role: "user"

        }
        console.log('new users', newUser)
        let { passwordHash: skip, ...tokenUser } = newUser;
        let users = readUsers()
        users.push(newUser)
        writeUsers(users)

        let token = signToken(tokenUser)
        console.log('token', token)
        res.status(201).json({ message: "user created", token })


    })
    .post("/login", async (req, res, next) => {
        let {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: "Missing required information"})
            return
        }
        let user = findByEmail(email)
        if (!user) {
            res.status(401).json({message: "Invalid credentials"})
            return
        }
        const match = await bcrypt.compare(password, user.passwordHash)
        if (!match) {
            res.status(401).json({message: "Invalid credentials"})
            return
        }
        let tokenUser = {id: user.id, email: user.email, role: user.role}
        let token = signToken(tokenUser)
        res.json({message: "Login success", token})

    })
    .post("/logout", authenticate, (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1]
        blacklistToken(token)
        return res.json({message: "Logged out successfully"})
    })
    .get("/profile", authenticate, (req, res, next) => {
        return res.json({user: req.user})
    })
export default router;