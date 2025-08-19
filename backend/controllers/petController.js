const Pet = require("../models/petmodel")

const getAllPets = async(req,res) =>{
    try{
        const pets = await Pet.find()
        res.status(200).json(pets)
    }catch(error){
        res.status(500).json({message: "Could not fetch the pets", error})
    }
}


const getPetById = async(req,res) => {
    const {id} = req.params
    try{
        const pet = await Pet.findById(id)

        if(!pet){
            return res.status(404).json({message: "Pet not found"})
        }
    res.status(200).json(pet)
    }catch(error){
        res.status(500).jason({message:"Error fetching pet",error})
    }
}

module.exports = {getAllPets, getPetById}