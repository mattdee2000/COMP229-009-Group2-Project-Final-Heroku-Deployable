let mongoose = require('mongoose');

// Create a model class
let inventoryModel = mongoose.Schema(
    {
        empName: String,
        email: String,
        phone: String,
        assetTag: String,
        location: String,
        issue: String,
        note: String,
        progress: String,
        eta: String,
    },
    {
        collection: "inventory"
    }
);

module.exports = mongoose.model('Inventory', inventoryModel);