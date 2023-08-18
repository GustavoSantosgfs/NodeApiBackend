const express = require('express')
const router = express.Router()
const peopleController = require('../controllers/peopleController')

router.get('/', peopleController.listPeople)
router.get('/:id', peopleController.getPerson)
router.post('/', peopleController.createPerson)
router.put('/:id', peopleController.updatePerson)
router.delete('/:id', peopleController.deletePerson)

module.exports = router