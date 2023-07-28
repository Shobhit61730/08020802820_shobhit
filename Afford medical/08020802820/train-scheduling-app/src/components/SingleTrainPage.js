import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@material-ui/core';

const SingleTrainPage = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch data from your backend API for a single train based on trainId
    axios.get(`/api/trains/${trainId}`) // Replace with your backend API endpoint
      .then((response) => {
        setTrain(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [trainId]);

  if (!train) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>{train.name}</Typography>
      <Typography variant="body1">Departure: {train.departureTime}</Typography>
      <Typography variant="body1">Arrival: {train.arrivalTime}</Typography>
      {/* Add other train information as needed */}
    </Container>
  );
};

export default SingleTrainPage;
