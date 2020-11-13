import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Reservations = () => {
  const getReservation = () => {
    axios.get('/api/homes/21/calendar')
      .then((response) => console.log(response));
  };

  return (
    <div>
      <p>Res</p>
      <button onClick={() => getReservation()}>Get Reservation at id 24</button>
    </div>
  );
};

export default Reservations;
