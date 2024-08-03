
// import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import axios from './api';

export const MyContext = createContext("");
export const MycontextProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const userId = "unique_user_id"; 

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await axios.get(`favorites/${userId}`);
            setFavorites(response.data.map(fav => fav.country));
        };
        fetchFavorites();
    }, [userId]);

    const addFavorite = async (country) => {
        await axios.post('/favorites', { userId, country });
        setFavorites([...favorites, country]);
    };

    const removeFavorite = async (country) => {
        await axios.delete('/favorites', { data: { userId, country } });
        setFavorites(favorites.filter(fav => fav.name.common !== country.name.common));
    };

    return (
        <MyContext.Provider value={{ history, setHistory, favorites, addFavorite, removeFavorite }}>
            {children}
        </MyContext.Provider>
    );
};