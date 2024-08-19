import React, { useContext, useEffect, useState } from 'react';
import axios from './api';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from './Contextapi';

const EventsList = () => {
  const toast = useToast();
 const {user,events,setEvents}=useContext(AuthContext);
 
  if(!user){
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
    
    toast({
      title: 'Please Login ',
      description: "Before visiting Events",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    return null;

  }
  const registerForEvent = async (eventId) => {
    try {
      console.log('email id', user);
      const response = await axios.post(`/events/${eventId}/register`, {
        user,
      });
      toast({
        title: 'Registration Status',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Update event registration status locally
      setEvents(events.map(event =>
        event._id === eventId ? { ...event, isRegistered: true } : event
      ));
    } catch (error) {
      console.error('Failed to register', error);
      toast({
        title: 'Error',
        description: 'Failed to register for the event',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const cancelRegistration = async (eventId) => {
    try {
      const response = await axios.delete(`/events/${eventId}/cancel`, {
        data: { user },
      });
      console.log("cansel responce",response);
      toast({
        title: 'Registration Cancelled',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEvents(events.map(event =>
        event._id === eventId ? { ...event, isRegistered: false } : event
      ));
    } catch (error) {
      console.error('Failed to cancel registration', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel registration',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
          <CardHeader>
            <Heading size="md">{event.name}</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="sm"><strong>Date:</strong> {formattedDate} {event.time}</Text>
            <Text fontSize="sm"><strong>Location:</strong> {event.location}</Text>
            <Divider my={3} />
            <details>
              <summary>More Details</summary>
              <Text mt={2}>{event.description}</Text>
            </details>
          </CardBody>
          <CardFooter>
            {event.isRegistered ? (
              <Button onClick={() => cancelRegistration(event._id)} colorScheme="red" width="full">
                Cancel Registration
              </Button>
            ) : (
              <Button onClick={() => registerForEvent(event._id)} colorScheme="blue" width="full">
                Register
              </Button>
            )}
          </CardFooter>
        </Card>
      );
    })}
  </SimpleGrid>
</Box>
  );
};

export default EventsList;
