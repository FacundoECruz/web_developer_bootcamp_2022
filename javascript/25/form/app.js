const form = document.querySelector("#shelterForm");
const input = document.querySelector("#filoName");
const list = document.querySelector("#filos");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const filoName = input.value;
    if (filoName === 'Hobbes' || filoName === 'Locke' || filoName === 'Spencer') {
        alert('Ese tipo no es rapero!!!!');
        input = "";
    }
    const newLI = document.createElement("LI");
    newLI.innerText = filoName;
    list.append(newLI);
    input.value = "";
});

