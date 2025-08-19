const express = require('express')
const router = express.Router()
const {getAllPets, getPetById} = require('../controllers/petController')

router.get('/',getAllPets)
router.get('/:id',getPetById)


module.exports = router