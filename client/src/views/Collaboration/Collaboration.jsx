import React from 'react';
import { Link } from 'react-router-dom';
import DonationForm from '../../components/Donation/DonationForm';
import DonationInfo from '../../components/Donation/DonationInfo';
import styles from './Collaboration.module.css';

const Collaboration = () => {
  return (
  <>
    <div className={styles['collaboration-container']}>
      <DonationForm />
      <DonationInfo />
    
    </div>
    <div className={styles['publicidad-container']}>
      <img className={styles['imagen-publicidad']} src="https://i.pinimg.com/564x/f4/22/30/f42230e621c19fea5815dde7a09ed83c.jpg" alt="PAYPAL" />
      <img className={styles['imagen-publicidad']} src="https://i.pinimg.com/564x/13/8a/b4/138ab4f0cef7ed70d580d0248f4b1ab4.jpg" alt="Banco Visa" />
      <img className={styles['imagen-publicidad']} src="https://i.pinimg.com/564x/88/e2/c8/88e2c804101b49b95410e216e816050a.jpg" alt="mercado pago" />
    </div>
    <div className={styles['inicio-container']}>
  <Link to="/home">
    <button>Inicio</button>
  </Link>
</div>
  </>
  );
};

export default Collaboration;
