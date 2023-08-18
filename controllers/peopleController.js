const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('database.db')
const Joi = require('joi')

const listPeople = (req, res) => {
    const selectQuery = 'SELECT * FROM people'
    db.all(selectQuery, (err, rows) => {
        if(err) {
            return res.status(500).json({
                error: 'Error fetching data from the database'
            })
        }
        
        console.log(rows)
        return res.status(200).json(rows)
    })
}

const getPerson = (req, res) => {
    const personId = req.params.id
    const selectQuery = 'SELECT * FROM people WHERE id = ?'
    db.get(selectQuery, [personId], (err, row) => {
        if (err) {
            return res.status(500).json({
                error: 'Error fetching data from the database'
            })
        }

        if(!row) {
            return res.status(404).json({
                error: 'Person not found'
            })
        }

        return res.status(200).json(row)
    })
}

const createPerson = (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email(),
        phone: Joi.string(),
        address: Joi.string(),
        birth_date: Joi.string(),
        gender: Joi.string(),
        cpf: Joi.string().required()
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message })
    }

    const { name, email, phone, address, birth_date, gender, cpf } = req.body

    const insertQuery = 'INSERT INTO people (name, email, phone, address, birth_date, gender, cpf) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(insertQuery, [name, email, phone, address, birth_date, gender, cpf], (err) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Error inserting data into the database' 
            })
        }

        return res.status(201).json({ message: 'Person created successfully' })
    })
}

const updatePerson = (req, res) => {
    const personId = req.params.personId

    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
        address: Joi.string(),
        birth_date: Joi.string(),
        gender: Joi.string(),
        cpf: Joi.string()
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
        return res.status(400).json({
            error: validationResult.error.details[0].message
        })
    }

    const updateValues = Object.entries(req.body).map(([key, value]) => `${key} = ?`).join(',')
    const updateQuery = `UPDATE people SET ${updateValues} WHERE id = ?`

    const updateData = Object.values(req.body)
    updateData.push(personId)

    db.run(updateQuery, updateData, (err) => {
        if (err) {
            return res.status(500).json({
                error: 'Error updating data in the database'
            })
        }

        return res.status(200).json({
            message: 'Person update successfully'
        })
    })
}

const deletePerson = (req, res) => {
    const personId = req.params.id

    
}

module.exports = {
    createPerson,
    updatePerson,
    listPeople,
    getPerson,
    deletePerson
}