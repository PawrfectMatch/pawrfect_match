const express = require('express')
const router = express.Router()
const {getAllPets} = require('../controllers/petController')

router.get('/',getAllPets)


module.exports = router