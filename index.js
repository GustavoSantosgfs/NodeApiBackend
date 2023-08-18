const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const peopleRoutes = require('./routes/people')
const path =  require('path')

app.use(express.static('public'))

app.get('/', (req, res) => {
    const documentationPath = path.join(__dirname, 'public', 'documentation.html')
    res.sendFile(documentationPath)
})

app.use('/people', peopleRoutes)
// app.use('/api/people', peopleRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})