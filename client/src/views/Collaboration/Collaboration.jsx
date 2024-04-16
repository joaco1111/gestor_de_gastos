import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import { Button } from 'react-bootstrap';
import styles from './Collaboration.module.css'; // Importa los estilos desde el archivo CSS modular

const Collaboration = () => {
    const token = JSON.parse(localStorage.getItem('loggedNoteAppUser')).tokenUser;

    const handleCollaborate = async () => {
        try {
            // Realizar la llamada a la API para crear la orden de pago en MercadoPago
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-order`, {
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Collaboration;

