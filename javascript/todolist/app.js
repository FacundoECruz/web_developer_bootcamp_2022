let input = prompt("What would you like to do?")

const todos = [];

while (input !== "quit" && input !=="q") {
    if (input === "new") {
        const newTodo = prompt("Add a new todo")
        todos.push(newTodo);
        console.log(todos);
    } else if (input === "list") {
        console.log(`********`)
        for (let i = 0; i < todos.length; i++){
            console.log(`${i}: ${todos[i]}`);
        }
        console.log('********')
    } else if (input === 'delete') {
        const index = prompt('Ok, enter index to delete:')
        const deleted = todos.splice(index, 1);
        console.log(`Ok, deleted ${deleted[0]}`);
    }
    input = prompt("What would you like to do?")
}
console.log("Ok, you quit the app")