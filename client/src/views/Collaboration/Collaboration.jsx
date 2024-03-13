import React from 'react';
import DonationForm from './DonationForm';
import DonationInfo from './DonationInfo';
import './styles.css';

const Collaboration = () => {
  return (
    <div className="collaboration-container">
      <DonationForm />
      <DonationInfo />
    </div>
  );
};

export default Collaboration;