import { Box, Button, Heading, Input, Text, Flex, IconButton, HStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useContext, useState } from 'react';
import { AuthContext } from './components/login-signup/Contextapi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const { logout, user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      // If user is logged in, log them out
      logout();
    }
    // Navigate to the login page
    navigate('/login');
    onClose && onClose(); // Close any open modals or sidebars if needed
  };

  return (
    <Box position="fixed" zIndex="1" bg="teal.500" p={4} w="100%">
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        position="relative"
      >
        <Heading as={Link} to="/" color="white"> Event Handler</Heading>

        <IconButton
          display={{ base: 'block', md: 'none' }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          onClick={isOpen ? onClose : onOpen}
          color="white"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          position="absolute"
          top={0}
          right={4}
        />

        <HStack
          spacing={{ base: 4, md: 8 }}
          fontSize={{ base: "14px", md: "12px" }}
          // fontWeight="900"
          display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="end"
          width={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
        >
          <Input
            type='text'
            id='search'
            placeholder='Search for event'
            display={{ base: 'none', md: 'block' }}
            bg="white"
            color="black"
            maxW="200px"
          />
          {/* <Text as={Link} to="/signup" color="white" cursor="pointer" onClick={onClose}>
            Signup
          </Text> */}
          {role=='admin' && <Text as={Link} to='/EventCreation' color="white" cursor="pointer" onClick={onClose}>
            Event Creation
          </Text>}
          { role=='admin' && <Text color="white" cursor="pointer" onClick={onClose}>
            Event Result
          </Text>}
          {/* Additional Texts */}
          <Text as={Link} to='/allEvents' color="white" cursor="pointer" onClick={onClose}>
            Events
          </Text>
          <Text color="white" cursor="pointer" onClick={onClose}>
            Additional Link 2
          </Text>
          
          <Text as="button" onClick={handleClick} color="white" cursor="pointer">
            {user ? 'Logout' : 'Login'}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
