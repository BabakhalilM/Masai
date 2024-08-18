// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   List,
//   ListItem,
//   Text,
//   useToast,
// } from '@chakra-ui/react';

// const EventsList = () => {
//   const [events, setEvents] = useState([]);
//   const toast = useToast();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('/api/events');
//         setEvents(response.data);
//       } catch (error) {
//         console.error('Failed to fetch events', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const registerForEvent = async (eventId) => {
//     try {
//       const response = await axios.post(`/api/events/${eventId}/register`, {
//         userId: 'YOUR_USER_ID', // Get this from your auth context or similar
//       });
//       toast({
//         title: 'Registration Status',
//         description: response.data.message,
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('Failed to register', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to register for the event',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box>
//       <List spacing={3}>
//         {events.map((event) => (
//           <ListItem key={event._id}>
//             <Text>{event.name}</Text>
//             <Button onClick={() => registerForEvent(event._id)}>
//               Register
//             </Button>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default EventsList;
