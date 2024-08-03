import mongoose from "mongoose";
const favoriteSchema = new mongoose.Schema({
    userId: String,
    country: Object
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;