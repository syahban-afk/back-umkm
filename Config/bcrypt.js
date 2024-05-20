const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    const salt = await bcrypt.hash(password, 16)
    return salt
}

const comparePassword = (password, hashPassword) => {
    const comparePassword = bcrypt.compare(password, hashPassword)
    return comparePassword
}

module.exports = {
    hashPassword,
    comparePassword
}