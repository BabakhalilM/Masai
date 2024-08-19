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
          params: { user, searchQuery },
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
    setSearchQuery(event.target.value); 
    };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      console.log(response);
      if (response.data && response.data.accessToken && response.data.userRole ) {
        const { accessToken } = response.data;

        Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
        
        console.log("user after set",user);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', email);
        localStorage.setItem('role', response.data.userRole);

        toast({
          title: 'Login successful.',
          description: 'You have been successfully logged in.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      

      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Login error:', err);

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
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
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
