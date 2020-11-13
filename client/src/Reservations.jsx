import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form.jsx';

const Reservations = () => {
  const [fees, setFees] = useState(
    {
      nightlyFee: 0,
      cleaningFee: 0,
      serviceFee: 0,
      taxes: 0,
    },
  );

  useEffect(() => {
    axios.get('/api/homes/21/calendar')
      .then((response) => {
        setFees({
          nightlyFee: response.data.nightlyFee,
          cleaningFee: response.data.cleaningFee,
          serviceFee: response.data.serviceFee,
          taxes: response.data.taxes,
        });
      });
  }, []);

  return (
    <div>
      <p>
        {fees.nightlyFee}
        / night
      </p>
      <Form />
    </div>
  );
};

export default Reservations;
