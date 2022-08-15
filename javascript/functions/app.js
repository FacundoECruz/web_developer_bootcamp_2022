//Hi exercise

// function repeat(message, count) {
//     let result = '';
//     for (let i = 0; i < count; i++) {
//         result += message;
//     }
//     console.log(result);
// }

// repeat('hi', 3);

//Array exercise
// function lastElement(array) {
//     return array[array.lenght];
// }

// const names = ['facu', 'anto', 'tami'];

// lastElement(names);

// function capitalize(str) {
//     let first = str[0].toUpperCase;
//     str.splice(0, 1, first);
//     console.log(str);
// }

// capitalize('hola')

function makeBetweenFunc(min, max) {
    return function (num) {
        return num >= min && num <= max; 
    }
}