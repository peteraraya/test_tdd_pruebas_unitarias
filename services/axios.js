const axios = require('axios')

const intance = axios.default({
    baseURL: 'https://www.miapp.app',
})

module.exports = axios;