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

import { createContext, useEffect, useState } from 'react';
import axios from './api';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const [role,setRole]=useState("");
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    
    const fetchEvents = async () => {
      if (!user) {
        console.warn('User is not logged in or user ID is missing.');
        return;
      }
      try {
        const response = await axios.get('/events', {
          params: { user, searchQuery }, // Send searchQuery to backend
        });
        console.log('response data: ', response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, [user,searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query as user types
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      console.log(response);
      if (response.data && response.data.accessToken && response.data.userRole ) {
        const { accessToken } = response.data;

        // Set tokens in cookies for secure storage
        Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
        // setRole(response.data.userRole);
        // console.log(response.data.userRole);
        // Set user data in state and local storage
        // console.log("emial in login",email);
        // setUser(email);
        console.log("user after set",user);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', email);
        localStorage.setItem('role', response.data.userRole);

        // Display success message
        toast({
          title: 'Login successful.',
          description: 'You have been successfully logged in.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        
      setTimeout(() => {
        window.location.href = '/allEvents';
      }, 1000);
      

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
  useEffect(() => {
    // Check if user data is available in localStorage
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const logout = async () => {
    // Clear cookies, local storage, and user state
    // const logoutuser=await axios.post('/logout');
    // console.log(logoutuser);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
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
    <AuthContext.Provider value={{events,setEvents, user, login, logout,role,handleSearchChange }}>
      {children}
    </AuthContext.Provider>
  );
};
