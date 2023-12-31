import mongoose, { Schema } from "mongoose";

const product = new Schema({
    name: String,
    price: Number,
    image: String,
    category: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


export default mongoose.model('products',product)