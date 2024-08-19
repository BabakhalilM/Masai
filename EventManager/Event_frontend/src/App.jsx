import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login-signup/Loginpage';
import RegisterForm from './components/login-signup/Signup';
import { Box } from '@chakra-ui/react';
import Header from './Navbar';
import CreateEventForm from './components/login-signup/CreateEvent';
import Home from './components/login-signup/Home';
import EventsList from './components/login-signup/allevents';
import EventsListadmin from './components/login-signup/EventsList';
import EditEvent from './components/login-signup/Editform';

function App() {
  return (
    <Box>
      <Box position="fixed" width="100%" zIndex="1000" top="0">
        <Header />
      </Box>

      <Box mt="80px"> 
         <Routes>
          <Route path='/edit-event/:eventId' element={<EditEvent />} />
          <Route path='/Eventresult' element={<EventsListadmin />} />
          <Route path="/" element={<Home />} />
          <Route path='/allEvents' element={<EventsList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path='/Eventcreation' element={<CreateEventForm />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
