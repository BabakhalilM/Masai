// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const toast = useToast();

// import { createContext } from "react";

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('/login', { email, password });

//       if (response.data && response.data.accessToken && response.data.refreshToken) {
//         const { accessToken, refreshToken } = response.data;
//         Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
//         Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' });
//         localStorage.setItem('accessToken', accessToken);
//         setUser(email); // Ensure this isn't causing re-render loops
//         localStorage.setItem('user', email);

//         toast({
//           title: 'Login successful.',
//           description: "You have been successfully logged in.",
//           status: 'success',
//           duration: 2000,
//           isClosable: true,
//         });
//       }
//     } catch (err) {
//       toast({
//         title: 'Login failed.',
//         description: err.response?.data?.message || err.message || 'Please check your credentials.',
//         status: 'error',
//         duration: 2000,
//         isClosable: true,
//       });
//     }
//   };

//   const logout = () => {
//     Cookies.remove('accessToken');
//     Cookies.remove('refreshToken');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('user');
//     setUser(null);

//     toast({
//       title: 'Logout successful.',
//       description: "You have been successfully logged out.",
//       status: 'success',
//       duration: 2000,
//       isClosable: true,
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState } from 'react';
import axios from './api';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const {role,setRole}=useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });

      if (response.data && response.data.accessToken && response.data.role ) {
        const { accessToken } = response.data;

        // Set tokens in cookies for secure storage
        Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
        setRole(response.data.role);
        // Set user data in state and local storage
        setUser(email);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', email);

        // Display success message
        toast({
          title: 'Login successful.',
          description: 'You have been successfully logged in.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Login error:', err);

      // Display error message
      toast({
        title: 'Login failed.',
        description: err.response?.data?.message || err.message || 'Please check your credentials.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const logout = async () => {
    // Clear cookies, local storage, and user state
    // const logoutuser=await axios.post('/logout');
    console.log(logoutuser);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);

    // Display logout message
    toast({
      title: 'Logout successful.',
      description: 'You have been successfully logged out.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,role }}>
      {children}
    </AuthContext.Provider>
  );
};
