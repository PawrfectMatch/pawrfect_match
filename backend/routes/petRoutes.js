const express = require('express')
const router = express.Router()
const {getAllPets, getPetById, createPet, updatePet} = require('../controllers/petController')

router.get('/',getAllPets)
router.get('/:id',getPetById)
router.post('/', createPet)
router.put('/:id',updatePet)


module.exports = router