import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import axios from './api';

const CreateEventForm = () => {
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        date: '',
        capacity: "",
        time: '',
        location: '',
    });

    const toast = useToast();
    const [noLimit, setNoLimit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventDataToSend = {
            ...eventData,
            capacity: noLimit ? Infinity : eventData.capacity, // Handle no limit case
        };
        try {
            const response = await axios.post('/createevent', eventDataToSend); // Update the endpoint to your backend
            toast({
                title: 'Event created.',
                description: `Event ${response.data.name} has been successfully created.`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setEventData({
                name: '',
                description: '',
                date: '',
                time: '',
                location: '',
            });
            
      setTimeout(() => {
        window.location.href = '/allEvents';
      }, 1000);
        } catch (error) {
            console.error('Error creating event:', error);
            toast({
                title: 'Error creating event.',
                description: error.response?.data?.message || 'Something went wrong.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" mb={4} isRequired>
                    <FormLabel>Event Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="description" mb={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="date" mb={4} isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="capacity" mb={4} isRequired={!noLimit}>
                    <FormLabel>Capacity</FormLabel>
                    <Input
                        type="number"
                        name="capacity"
                        value={noLimit ? '' : eventData.capacity}
                        onChange={handleChange}
                        isDisabled={noLimit} 
                    />
                </FormControl>

                <FormControl id="no-limit" mb={4}>
                    <Checkbox
                        name="noLimit"
                        isChecked={noLimit}
                        onChange={(e) => setNoLimit(e.target.checked)}
                    >
                        No Limit
                    </Checkbox>
                </FormControl>


                <FormControl id="time" mb={4} isRequired>
                    <FormLabel>Time</FormLabel>
                    <Input
                        type="time"
                        name="time"
                        value={eventData.time}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="location" mb={4} isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                    />
                </FormControl>

                <Button type="submit" colorScheme="teal" width="full">
                    Create Event
                </Button>
            </form>
        </Box>
    );
};

export default CreateEventForm;
