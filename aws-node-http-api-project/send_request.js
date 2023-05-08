(async () => {
    const axios = require('axios')
    const url = 'http://localhost:3000'
    
    const requests = 
        await Promise.all([
            axios.get(`${url}/?id=1`),
            axios.get(`${url}/?id=1`),
            axios.get(`${url}/?id=1`),
            axios.get(`${url}/?id=1`),

            axios.get(`${url}/?id=2`),
            axios.get(`${url}/?id=2`),
            axios.get(`${url}/?id=2`),
            axios.get(`${url}/?id=2`),

        ])
    
    console.log(requests.filter(r => console.log('data->', r.data)))
})()

