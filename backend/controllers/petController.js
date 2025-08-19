const Pet = require("../models/petmodel")

const getAllPets = async(req,res) =>{
    try{
        const pets = await Pet.find()
        res.status(200).json(pets)
    }catch(error){
        res.status(500).json({message: "Could not fetch the pets", error})
    }
}

module.exports = {getAllPets}