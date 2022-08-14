//Hi exercise

function repeat(message, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += message;
    }
    console.log(result);
}

repeat('hi', 3);