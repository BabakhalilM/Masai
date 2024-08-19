import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react';
import axios from './api';
import { AuthContext } from './Contextapi';

const EditEvent = () => {
    const { eventId } = useParams();
    
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    capacity: '',
  });

  useEffect(() => {
    
    const fetchEvent = async () => {
        try {
            console.log(eventId);
          const response = await axios.get(`/edit-event/${eventId}`);
          setEventData(response.data);
          console.log(response);
        } catch (error) {
          console.log(error);
          toast({
            title: 'Error',
            description: 'Failed to fetch event details',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      };
      

    fetchEvent();
  }, [eventId, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/events/${eventId}`, eventData);
      toast({
        title: 'Success',
        description: 'Event updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/allevents');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update event',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Event Name</FormLabel>
          <Input
            name="name"
            value={eventData.name}
            onChange={handleChange}
            placeholder="Event Name"
            required
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={eventData.date.split('T')[0]} 
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Time</FormLabel>
          <Input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            value={eventData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event Description"
            required
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Capacity</FormLabel>
          <NumberInput min={1} max={500} value={eventData.capacity || ''}>
            <NumberInputField
              name="capacity"
              onChange={handleChange}
              placeholder="Capacity"
            />
          </NumberInput>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditEvent;
