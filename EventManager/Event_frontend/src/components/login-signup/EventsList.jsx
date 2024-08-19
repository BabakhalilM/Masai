import React, { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from './Contextapi';
import { useNavigate } from 'react-router-dom';

const EventsListadmin = () => {
    const navigate=useNavigate();
  const toast = useToast();
  const { user, events, setEvents } = useContext(AuthContext);

  if (!user) {
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);

    toast({
      title: 'Please Login',
      description: 'Before visiting Events',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    return null; 
  }
  const handleEdit = (eventId) => {
    console.log('Navigating to edit-event with ID:', eventId); // Ensure this logs a valid eventId
    navigate(`/edit-event/${eventId}`);
  };
  
  

  return (
    <Box p={4}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {events.map((event) => {
          const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <Card key={event._id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
                {console.log(event._id)}
              <CardHeader>
                <Heading size="md">{event.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="sm"><strong>Date:</strong> {formattedDate} {event.time}</Text>
                <Text fontSize="sm"><strong>Location:</strong> {event.location}</Text>
                <Text fontSize="sm"><strong>Participants:</strong> {event.participants.length}/{event.capacity || 'Unlimited'}</Text>
                <Text fontSize="sm"><strong>Waitlist:</strong> {event.waitlist.length}</Text>
                <Divider my={3} />
                <details>
                  <summary>More Details</summary>
                  <Text mt={2}>{event.description}</Text>
                </details>
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" onClick={() => handleEdit(event._id)}>
                    Edit
                  </Button>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default EventsListadmin;
