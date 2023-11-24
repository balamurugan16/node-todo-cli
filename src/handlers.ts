import { allCommand, runCommand } from "./db";
import { Todo } from "./types";

export async function createTodo(todo: string): Promise<void> {
  try {
    await runCommand(`INSERT INTO todos (todo) VALUES(?)`, [todo])
  } catch (err) {
    console.log(err.message)
  }
}

export async function viewAllTodos() {
  try {
    const rows: Todo[] = await allCommand("SELECT * FROM todos", [])
    return rows
  } catch (error) {
    console.error(error)
  }
}

export async function searchForTodo(todoPattern: string) {
  const todos = await viewAllTodos()
  const filteredElements = todos.filter((todo) => {
    return todo.todo.toLowerCase().includes(todoPattern.toLowerCase())
  })
  return filteredElements;
}

