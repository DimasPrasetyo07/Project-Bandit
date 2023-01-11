const bcrypt = require('bcryptjs')

const createHashPW = (password) => bcrypt.hashSync(password)
const compareHashWithPW = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = {createHashPW, compareHashWithPW}