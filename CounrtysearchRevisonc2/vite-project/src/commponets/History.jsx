import React, { useContext } from 'react';
import { MyContext } from './contextprovider';
import { Box, Heading } from '@chakra-ui/react';

const History = () => {
    const { history } = useContext(MyContext);
    console.log(history);
    
    return (
        <Box mt={"60px"}>
            <Heading>Your History</Heading>
            {history.map((item, index) => (
                <p style={{textAlign:"left"}} key={index}>
                    <span><strong>{index}. </strong></span>{item}</p>
            ))}
        </Box>
    );
};

export default History;
