const mongoose = require("mongoose");
const { Schema } = mongoose;

const savedItemsSchema = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    ]
});

const SavedItems = mongoose.model("SavedItems", savedItemsSchema);

module.exports = SavedItems;