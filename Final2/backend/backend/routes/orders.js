const Order=require("../models/order");
const Client=require("../models/client")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ConsoleReporter } = require("jasmine");


router.get(`/orders`, async (req, res) =>{
    const orderlist = await Order.find().populate('client').sort('dateDorder');
   

    if(!orderlist) {
        res.status(500).json({success: false})
    } 
    res.send(orderlist);
})

router.get('/orders/:id', async(req,res)=>{
    const order = await Order.findById(req.params.id);

    if(!order) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(order);
})


router.post(`/orders`, async (req, res) =>{
    

    let order = new Order({
        choosedclient:req.body.choosedclient,
        choosedproduct: req.body.choosedproduct,
        prixcmd: req.body.prixcmd,
        qtycmd: req.body.qtycmd,
})

    order = await order.save();

    if(!order) 
    return res.status(500).send('The client cannot be created')

    res.send(order);
})

router.put('/orders/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
   

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            choosedclient:req.body.choosedclient,
            choosedproduct: req.body.choosedproduct,
            prixcmd: req.body.prixcmd,
            qtycmd: req.body.qtycmd,
            status:req.body.status
        
        },
        { new: true}
    )

    if(!order)
    return res.status(500).send('the client cannot be updated!')

    res.send(order);
})

router.delete('/transactions/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(orders =>{
        if(orders) {
            return res.status(200).json({success: true, message: 'the client is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "client not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})


module.exports =router;