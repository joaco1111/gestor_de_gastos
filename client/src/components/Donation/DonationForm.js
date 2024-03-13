// DonationForm.js
import React from 'react';

const DonationForm = () => {
  return (
    <div className="donation-form">
      <h2>¡Haz tu donación!</h2>
      <form>
        <label htmlFor="amount">Cantidad:</label>
        <input type="text" id="amount" name="amount" placeholder="Ingrese la cantidad a donar" />
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" placeholder="Ingrese su nombre" />
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" />
        <button type="submit">Donar</button>
      </form>
    </div>
  );
};

export default DonationForm;

