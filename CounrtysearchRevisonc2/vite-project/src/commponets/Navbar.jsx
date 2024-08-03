import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  Flex,
} from '@chakra-ui/react';

const Navbar = () => {
  const user = localStorage.getItem('user');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
    navigate('/login'); 
  };

  return (
    <Box
      as="nav"
      bg="teal.500"
      p="4"
      boxShadow="md"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      
    >
      <Flex justify="space-between" align="center" wrap="wrap">
        <Box color="white" fontWeight="bold" fontSize="26px">
          Country
        </Box>

        <HStack spacing="4" flex="1" justify="center">
          <Button
            as={Link}
            to={isAuthenticated ? "/search" : "/login"}
            colorScheme="teal"
            variant="solid"
            size="md"
            borderRadius="md"
            _hover={{ bg: 'teal.600' }}
          >
            Search
          </Button>

          {!isAuthenticated ? (
            <>
              <Button
                as={Link}
                to="/login"
                colorScheme="blue"
                variant="outline"
                size="md"
                color={'white'}
                borderRadius="md"
                _hover={{ bg: 'blue.600', color: 'white' }}
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/signup"
                colorScheme="green"
                variant="solid"
                size="md"
                borderRadius="md"
                _hover={{ bg: 'green.600' }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/history"
                colorScheme="teal"
                variant="solid"
                size="md"
                borderRadius="md"
                _hover={{ bg: 'teal.600' }}
              >
                History
              </Button>
              <Button
                as={Link}
                to="/favorites"
                colorScheme="teal"
                variant="solid"
                size="md"
                borderRadius="md"
                _hover={{ bg: 'teal.600' }}
              >
                Favorites
              </Button>
              
              <Button
                colorScheme="red"
                variant="outline"
                size="md"
                color={"white"}
                borderRadius="md"
                onClick={handleLogout}
                _hover={{ bg: 'red.600', color: 'white' }}
              >
                Logout
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
