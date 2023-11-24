import sqlite3 from "sqlite3"
import { promisify } from "util"

const sqlite = sqlite3.verbose()

export const db = new sqlite.Database("../db.sql")

db.run("PRAGMA foreign_keys = ON;")

const todoTable = `
  CREATE TABLE IF NOT EXISTS todos (
  todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
  todo VARCHAR(255) NOT NULL
)
`

// todo table
db.run(todoTable)


export const runCommand = promisify(db.run).bind(db)
export const allCommand = promisify(db.all).bind(db)
