import React, { useContext, useState } from 'react';
import { AuthContext } from './Contextapi'; // Adjust this import based on your file structure
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white">
      <Text fontSize="2xl">Login</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password" mt="4" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">Login</Button>
        </VStack>
      </form>
      <br />
      <p>Create an Account <Text color={"blue"} as={Link} to="/Signup" size="md">Signup</Text></p>
      {/* <p><Text color={"blue"} as={Link} to="/forgotpassword" size="md">ForgotPassword?</Text></p> */}
    </Box>
  );
};

export default LoginForm;
