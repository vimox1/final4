const Client=require("../models/client");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get(`/list-user`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=2342342,234234
    const clientlist = await Client.find();
   

    if(!clientlist) {
        res.status(500).json({success: false})
    } 
    res.send(clientlist);
})

router.get('/list-user/:id', async(req,res)=>{
    const clientlist = await Client.findById(req.params.id);

    if(!clientlist) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(clientlist);
})



router.post(`/create-user`, async (req, res) =>{
    

    let client = new Client({
        refclient:req.body.refclient,
        nom: req.body.nom,
        prenom: req.body.prenom,
        fonction: req.body.fonction,
        adressepreso: req.body.adressepreso,
        adresselaivraison: req.body.adresselaivraison,
        codepostal: req.body.codepostal,
        ville: req.body.ville,
        genre: req.body.genre,
        Nbenfant: req.body.Nbenfant,
        datenaiss: req.body.datenaiss
})

    client = await client.save();

    if(!client) 
    return res.status(500).send('The client cannot be created')

    res.send(client);
})



router.put('/list-user/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
   

    const client = await Client.findByIdAndUpdate(
        req.params.id,
        {
            refclient:req.body.refclient,
            nom: req.body.nom,
            prenom: req.body.prenom,
            fonction: req.body.fonction,
            adressepreso: req.body.adressepreso,
            adresselaivraison: req.body.adresselaivraison,
            codepostal: req.body.codepostal,
            ville: req.body.ville,
            genre: req.body.genre,
            Nbenfant: req.body.Nbenfant,
            datenaiss: req.body.datenaiss
        },
        { new: true}
    )

    if(!client)
    return res.status(500).send('the client cannot be updated!')

    res.send(client);
})

router.delete('/list-user/:id', (req, res)=>{
    Client.findByIdAndRemove(req.params.id).then(client =>{
        if(client) {
            return res.status(200).json({success: true, message: 'the client is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "client not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

module.exports =router;