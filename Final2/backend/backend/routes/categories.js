const Category=require("../models/category");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get(`/category`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=2342342,234234
    const categorylist = await Category.find();
   

    if(!categorylist) {
        res.status(500).json({success: false})
    } 
    res.send(categorylist);
})

router.get('/category/:id', async(req,res)=>{
    const categorylist = await Category.findById(req.params.id);

    if(!categorylist) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(categorylist);
})




router.post(`/category`, async (req, res) =>{
    

    let categorie = new Category({
        nomCategory:req.body.nomCategory,
        numCategory: req.body.numCategory,
        iconCategory: req.body.iconCategory,
    })

    categorie = await categorie.save();

    if(!categorie) 
    return res.status(500).send('The client cannot be created')

    res.send(categorie);
})


router.put('/category/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
   

    const categorie = await Category.findByIdAndUpdate(
        req.params.id,
        {
            nomCategory:req.body.nomCategory,
            numCategory: req.body.numCategory,
            iconCategory: req.body.iconCategory,
        },
        { new: true}
    )

    if(!categorie)
    return res.status(500).send('the client cannot be updated!')

    res.send(categorie);
})

router.delete('/category/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(categorie =>{
        if(categorie) {
            return res.status(200).json({success: true, message: 'the client is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "client not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})





module.exports =router;