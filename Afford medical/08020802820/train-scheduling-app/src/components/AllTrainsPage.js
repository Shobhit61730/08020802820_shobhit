import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@material-ui/core';

const AllTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API for all trains
    axios.get('/api/allTrains') // Replace with your backend API endpoint
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>All Trains</Typography>
      {/* display the list of trains here */}
      {trains.map((train) => (
        // render each train item here
        <div key={train.id}>
          <Typography variant="h5">{train.name}</Typography>
          <Typography variant="body1">Departure: {train.departureTime}</Typography>
          <Typography variant="body1">Arrival: {train.arrivalTime}</Typography>
          {/* Add other train information as needed */}
        </div>
      ))}
    </Container>
  );
};

export default AllTrainsPage;
