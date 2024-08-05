import React, { useContext, useState, useEffect, createContext } from 'react';
import { Box, Button, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { debounce} from 'lodash';
import { MyContext } from './contextprovider';
import axios from 'axios';
const contains = (array, value) => {
    return array.indexOf(value) !== -1;
};
const Search = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const { history, setHistory, favorites, addFavorite, removeFavorite } = useContext(MyContext);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        if (search) {
            fetchCountries(search);
        }
    }, [search]);

    const fetchCountries = debounce(async (currencyCode) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
            setCountries(response.data);
            // setHistory([...history, currencyCode]);
            if (!contains(history, currencyCode)) {
                console.log("Adding to history:", currencyCode);
                setHistory(prevHistory => [...prevHistory, currencyCode]);
            } else {
                console.log("Already in history:", currencyCode);
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    }, 500);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const sortCountries = (order) => {
        const sorted = [...countries].sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            if (nameA < nameB) return order === "asc" ? -1 : 1;
            if (nameA > nameB) return order === "asc" ? 1 : -1;
            return 0;
        });
        if (!history.includes(search)) {
            const newHistory = [...history, search];
            setHistory(newHistory);
        } else {
            console.log("Already in history");
        }
        setCountries(sorted);
        setSortOrder(order);
    };

    const toggleFavorite = (country) => {
        if (favorites.some(fav => fav.name.common === country.name.common)) {
            removeFavorite(country);
        } else {
            addFavorite(country);
        }
    };

    return (
        <>
            <Box mt={"60px"}>
                <Input
                    type="text"
                    placeholder="Enter currency code"
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button onClick={() => sortCountries(sortOrder === "asc" ? "desc" : "asc")}>
                   Search & show in {sortOrder === "asc" ? "Descending" : "Ascending"}
                </Button>
            </Box>
            <Box>
                {countries.length > 0 ? (
                    <SimpleGrid columns={2} spacing={10}>
                        {countries.map((country) => (
                            <Box key={country.cca3} borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <Text>{country.name.common}</Text>
                                <Text>{country.capital}</Text>
                                <Text>{country.languages && Object.values(country.languages).join(", ")}</Text>
                                <Text>{country.currencies && Object.values(country.currencies).map(currency => currency.name).join(", ")}</Text>
                                <img src={`https://flagsapi.com/${country.cca2}/shiny/64.png`} alt={`${country.name.common} flag`} />
                                <Button onClick={() => toggleFavorite(country)}>
                                    {favorites.some(fav => fav.name.common === country.name.common) ? "Remove from Favorites" : "Add to Favorites"}
                                </Button>
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Text>No data available. Please initiate a search.</Text>
                )}
            </Box>
        </>
    );
};

export default Search;
