import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
<<<<<<< HEAD
import { Button } from 'react-bootstrap'; // Importamos el componente Button de Bootstrap
import './Collaboration.module.css'; // Asumo que tienes estilos personalizados
=======
import { Button } from 'react-bootstrap';
import styles from './Collaboration.module.css'; // Importa los estilos desde el archivo CSS modular
>>>>>>> 21334f20f6b4acd9de8ac8362c0598f62f39bb61

const Collaboration = () => {
    const token = JSON.parse(localStorage.getItem('loggedNoteAppUser')).tokenUser;

    const handleCollaborate = async () => {
        try {
            // Realizar la llamada a la API para crear la orden de pago en MercadoPago
<<<<<<< HEAD
            const response = await fetch('http://localhost:3001/create-order', {
=======
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-order`, {
>>>>>>> 21334f20f6b4acd9de8ac8362c0598f62f39bb61
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            const data = await response.json();

            // Redirigir a la página de pago de MercadoPago
            window.open(data.init_point, '_blank');
        } catch (error) {
            console.error(error);
            // Manejo de errores
        }
    };

    return (
<<<<<<< HEAD
        <div className="container">
            <NavBar />
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h3>Haz tu donación</h3>
                            <p>Tu donación es la clave para que sigamos creciendo.
                             Con tu apoyo, proporcionamos ayuda vital a quienes más lo necesitan.
                             ¡Únete a nosotros y marca la diferencia ahora!</p>
                            <Button variant="primary" onClick={handleCollaborate}>Donar!</Button>
=======
        <>
            <NavBar />
        <div className={styles.container}>
            <div className="row justify-content-center align-items-center mt-5">
                <div className="col-md-8">
                    <div className={styles.cardDonacion}>
                        <div className={styles.cardDonacionText}>
                            <h2>¡Ayúdanos a mejorar!</h2>
                            <p>
                                Tu contribución es esencial para hacer crecer nuestra aplicación y ofrecer mejores servicios a nuestra comunidad de usuarios.
                                Con tu apoyo, podemos implementar nuevas características, mejorar la experiencia del usuario y resolver problemas más rápido.
                                ¡Únete a nosotros y sé parte del proceso de mejora continua!
                            </p>
                            <Button variant="primary" onClick={handleCollaborate}>Colaborar Ahora</Button>
                        </div>
                        <div className={styles.cardDonacionImg}>
                            <img src="https://i.pinimg.com/564x/a8/d1/e2/a8d1e2ded2b3264ec618c059af0c0b70.jpg" alt="contexto" />
                            <p>Formas de pago ofrecidas por Mercado Pago</p>
                            <ul>
                                <li>Tarjeta de crédito</li>
                                <li>Tarjeta de débito</li>
                                <li>Efectivo</li>
                                <li>Transferencia bancaria</li>
                            </ul>
>>>>>>> 21334f20f6b4acd9de8ac8362c0598f62f39bb61
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Collaboration;

