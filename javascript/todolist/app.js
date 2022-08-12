let input = prompt("What would you like to do?")

const todo = [];

while (input !== "quit" && "q") {
    input = prompt("What would you like to do?")
    if (input === "new") {
        let nueva = prompt("Add a new todo")
        let tarea = todo.unshift(nueva);
        console.log(todo);
    } else if (input === "list") {
        console.log(`********`)
        for (let i = 0; i < todo.length; i++){
            console.log(todo[i]);
        }
        console.log('********')
    }
}
console.log("Ok, you quit the app")