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
        res.status(500).json({message:"Error fetching pet",error})
    }
}


const createPet = async(req,res) =>{
    try{
        const petData = req.body
        const newPet = new Pet(petData)
        const savedPet = await newPet.save()
        
        res.status(200).json(savedPet)
    }catch(error){
        res.status(500).json({message:"Error creating pet",error})
    }
}


const updatePet = async(req,res) =>{
    const {id} = req.params
    const updatedData = req.body

    try{
        const updatedPet = await Pet.findByIdAndUpdate(id,updatedData, {new:true})
        if(!updatedPet){
            res.status(404).json({message:"Pet not found"})
        }
        res.status(200).json(updatedPet)
    }catch(error){
        res.status(500).json({message:"Error updating pet",error})
    }
}


const deletePet = async(req,res) =>{
    const {id} = req.params

    try{
        const deletedPet = await Pet.findByIdAndDelete(id)
        if(!deletedPet){
            res.status(404).json({message:"Pet not found"})
        }
        res.status(200).json({message:"Pet deleted successfully"})
    }catch(error){
        res.status(500).json({message:"Error deleting pet".error})
    }
}



module.exports = {getAllPets, getPetById, createPet, updatePet, deletePet}