const express = require('express')
const router = express.Router()
const {getAllPets, getPetById, createPet} = require('../controllers/petController')

router.get('/',getAllPets)
router.get('/:id',getPetById)
router.post('/', createPet)


module.exports = router