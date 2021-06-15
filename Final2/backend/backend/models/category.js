const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    nomCategory: {type : String,required : true},
    numCategory: {type : Number,required : true},

})


categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model("Category",categorySchema);