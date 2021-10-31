import React from 'react';
import spinner from '../../assets/images/spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
  </>
);

export default Spinner;
