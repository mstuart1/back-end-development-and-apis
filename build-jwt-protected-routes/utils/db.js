import path from "path";
import fs from 'fs';

const DB_PATH = path.join(import.meta.dirname, "../data/users.json");

export const readUsers = () => {
    const data = fs.readFileSync(DB_PATH, {encoding: "utf8"}).trim()
    if (!data) return []
    return JSON.parse(data)
}

export const writeUsers = (users) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))
}

export function findByEmail(email)  {
    return readUsers().find(user => user.email === email) || null
}

export function findById(id)  {
    return readUsers().find(user => user.id === id) || null
}