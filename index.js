const express = require('express')
const app = express()

const toDoRoutes = require('./src/routes/todo')

app.use(express.json())
app.use('/todo', toDoRoutes)

app.listen(4000, () => {
    console.log(`Server berjalan di http://localhost:4000`)
}).setTimeout(300000);