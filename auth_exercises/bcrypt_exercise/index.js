const bcrypt = require('bcrypt')

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(pw, salt)
//     console.log(salt)
//     console.log(hash)
// }

// hashPassword('antone');

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if(result) {
        console.log("Bien ahi te logueastee!!")
    } else {
        console.log("Mal ahi no te logueaste :(")
    }
}

login('antone', '$2b$10$GOjKk6s4yVILmCKx0difqOzEv91YFM56MB3o2uSJ.o.Esy4yREfsO');