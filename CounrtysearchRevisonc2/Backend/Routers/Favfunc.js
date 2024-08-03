import {Router} from 'express';
import Favorite from '../Modules/Fav.js';

const fav=Router()

fav.post('/favorites', async (req, res) => {
    const { userId, country } = req.body;
    const newFavorite = new Favorite({ userId, country });
    await newFavorite.save();
    res.send(newFavorite);
});

fav.get('/favorites/:userId', async (req, res) => {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId });
    res.send(favorites);
});

fav.delete('/favorites', async (req, res) => {
    const { userId, country } = req.body;
    await Favorite.deleteOne({ userId, 'country.cca3': country.cca3 });
    res.send({ success: true });
});

export default fav;