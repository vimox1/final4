const Product = require('../models/product');
const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'backend/public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });



router.get(`/physical/product-list`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=2342342,234234
    let filter= {}; // because of scoping in java we can not use filter out of this if so we create general var
    if(req.query.categories )
    {
        const filter = {category : req.query.categories.split(',') }//when it's vide we will get all params , else get them by catego
    }
    const productList = await Product.find(filter).populate('category');
   

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

router.get('/physical/product-list/:id', async(req,res)=>{
    const productList = await Product.findById(req.params.id).populate('category');//populate permet dafficher les info dun autre tableau

    if(!productList) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(productList);
})


router.post(`/physical/add-product`,uploadOptions.single('image'), async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')
    const fileName = req.file.filename;
    const path=`${req.protocol}://${req.get('host')}/public/uploads/`;
    let product = new Product({
        nomProduit: req.body.nomProduit,
        refProduit: req.body.refProduit,
        refFourni: req.body.refFourni,
        image: `${path}${fileName}`,
        priceDeVente: req.body.priceDeVente,
        description: req.body.description,
        priceDachat: req.body.priceDachat,
        tva: req.body.tva,
        category: req.body.category,
        numSurStock: req.body.numSurStock,
    })

    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})



router.delete('/physical/product-list/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.put('/physical/add-product/:id',uploadOptions.single('image'),async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid Product!');

    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }
   

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            nomProduit: req.body.nomProduit,
            refProduit: req.body.refProduit,
            refFourni: req.body.refFourni,
            image: imagepath,
            priceDeVente: req.body.priceDeVente,
            priceDachat: req.body.priceDachat,
            tva: req.body.tva,
            category: req.body.category,
            numSurStock: req.body.numSurStock,
        },
        { new: true}
    );

    if(!updatedProduct)
    return res.status(500).send('the client cannot be updated!')

    res.send(updatedProduct);
})




module.exports =router;