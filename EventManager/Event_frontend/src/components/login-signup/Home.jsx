import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react'

const Home = () => {

  return (
    <Box align={"center"} lineHeight={9}  >
      <Heading letterSpacing={1}>Welcome to Event Management</Heading>
      <Text>Login to See And Register Different Events we are Condecting</Text>
      <Text><strong>Note:-</strong> Login to Create Event With admin Details</Text>
    </Box>
  )
}

export default Home;
