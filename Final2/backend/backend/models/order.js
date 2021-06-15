const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  
    choosedclient: {type: mongoose.Schema.Types.ObjectId,ref: 'Client'},
    choosedproduct: {type: mongoose.Schema.Types.ObjectId,ref: 'Product'},
    prixcmd: {type: Number},
    qtycmd: {type: Number},
    status:{type:String,default:'en cour de traitment'},
    dateDeCommande: {type: Date,default: Date.now },

})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Order', orderSchema);



