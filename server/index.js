const express = require('express')
const app = express()
const port = 4001

app.get('/', (req, res) => {
    res.send('hola')
})

app.listen(port, () => {
    console.log(`App listening in server ${port}` )
})