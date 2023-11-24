import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { createTodo, searchForTodo, viewAllTodos } from "./handlers";

yargs(hideBin(process.argv))
  .command("new <todo>", "creates a new todo", (yargs) => {
    return yargs.positional("todo", {
      type: "string",
      describe: "the todo to be saved",
    }).option("tags", {
      alias: 't',
      type: "array",
      description: "Tags for the todo"
    })
  }, (argv) => {
    createTodo(argv.todo)
  })
  .command("list", "list all todos", (yargs) => {
    return yargs.option("verbose", {
      alias: "v",
      description: "verbose todos"
    })
  }, async (args) => {
    const todos = await viewAllTodos()
    if (args.verbose) {
      console.table(todos)
      return;
    }
    todos.forEach((todo) => {
      console.log(todo.todo)
    })
  })
  .command("search <pattern>", "search for tag", (yargs) => {
    return yargs.positional("pattern", {
      type: "string",
      describe: "the todo pattern to be searched",
    }).option("verbose", {
      alias: "v",
      description: "verbose todos"
    })
  }, async (args) => {
    const todos = await searchForTodo(args.pattern)
    if (args.verbose) {
      console.table(todos)
      return;
    }
    todos.forEach((todo) => {
      console.log(todo.todo)
    })
  })

  .parse()
