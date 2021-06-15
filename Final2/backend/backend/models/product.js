const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nomProduit: {type: String,required: true},
    refProduit: {type: String,required: true},
    refFourni: {type: String,required: true},
    image: {type: String,default: ''},
    description: {type: String,required: true},
    priceDeVente : {type: Number,default:0,required: true},
    priceDachat : {type: Number,default:0,required: true},
    tva: {type: Number,default:0,required: true},
    category: {type: mongoose.Schema.Types.ObjectId,ref: 'Category',required:true},
    numSurStock: {type: Number,required: true,min: 0,max: 255},
    dateCreation: {type: Date,default: Date.now },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


module.exports = mongoose.model('Product', productSchema);
