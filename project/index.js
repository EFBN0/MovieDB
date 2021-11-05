// Express
const express = require('express')
const app = express()
const fetch = require('cross-fetch')
const port = 3000

app.use(express.static('public'))

app.get('/api/:pag', async (req, res) => {
    await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${req.params.pag}`)
        .then(response => response.json())
        .then(data => res.json(data))
})

// rodar na porta 3000
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});