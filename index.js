const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const peopleRoutes = require('./routes/people')
const path =  require('path')

app.use(express.static('public'))

app.use(cors())

app.get('/', (req, res) => {
    const documentationPath = path.join(__dirname, 'public', 'documentation.html')
    res.sendFile(documentationPath)
})

app.use(express.json())
app.use('/people', peopleRoutes)
// app.use('/api/people', peopleRoutes) 
//esse comentário vai sair daqui kkkkkkk (anotei só pra eu lembrar de fazer um esquema aqui)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})