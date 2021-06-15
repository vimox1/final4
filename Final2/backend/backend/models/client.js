const mongoose=require('mongoose');
const clientSchema = mongoose.Schema({
    refclient:{type:Number},
    nom:{ type :String},
    prenom:{ type :String},
    fonction:{ type :String},
    adressepreso:{ type :String},
    adresselaivraison:{ type :String},
    codepostal:{ type :String},
    ville:{ type :String},
    genre:{ type :String},
    Nbenfant:{ type :Number},
    datenaiss:{type : Date},
    
 
   });
   clientSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

clientSchema.set('toJSON', {
    virtuals: true,
});
   module.exports = mongoose.model("Client",clientSchema);