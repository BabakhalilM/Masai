import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login-signup/Loginpage';
import RegisterForm from './components/login-signup/Signup';
// import Navbar from './Navbar';
import { Box } from '@chakra-ui/react';
import Header from './Navbar';
import CreateEventForm from './components/login-signup/CreateEvent';
import Home from './components/login-signup/Home';
import EventsList from './components/login-signup/allevents';
// import EventsList from './components/login-signup/EventsList';

function App() {
  return (
    <Box style={{border:"1px solid"}}>
      <Header/>
      <Box mt={"80px"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/allEvents' element={<EventsList/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path='/Eventcreation' element={<CreateEventForm/>}/>
      </Routes>
      </Box>
    </Box>
  );
}

export default App;
