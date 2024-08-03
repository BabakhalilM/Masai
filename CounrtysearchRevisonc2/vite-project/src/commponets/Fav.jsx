import React, { useContext } from 'react';
import { Box, SimpleGrid, Text, Button, Heading } from '@chakra-ui/react';
import { MyContext } from './contextprovider';
// import { MyContext } from './Search';
// import { MyContext } from './MycontextProvider';

const Fav = () => {
    const { favorites, removeFavorite } = useContext(MyContext);

    return (
        <Box mt={"60px"}>
            <Heading>My Favorites</Heading>
            {favorites.length > 0 ? (
                <SimpleGrid columns={2} spacing={10}>
                    {favorites.map((country) => (
                        <Box key={country.cca3} borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Text>{country.name.common}</Text>
                            <Text>{country.capital}</Text>
                            <Text>{country.languages && Object.values(country.languages).join(", ")}</Text>
                            <Text>{country.currencies && Object.values(country.currencies).map(currency => currency.name).join(", ")}</Text>
                            <img src={`https://flagsapi.com/${country.cca2}/shiny/64.png`} alt={`${country.name.common} flag`} />
                            <Button onClick={() => removeFavorite(country)}>
                                Remove from Favorites
                            </Button>
                        </Box>
                    ))}
                </SimpleGrid>
            ) : (
                <Text>No favorite countries added.</Text>
            )}
        </Box>
    );
};

export default Fav;
