import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import { Button } from 'react-bootstrap'; // Importamos el componente Button de Bootstrap
import './Collaboration.module.css'; // Asumo que tienes estilos personalizados

const Collaboration = () => {
    const token = JSON.parse(localStorage.getItem('loggedNoteAppUser')).tokenUser;

    const handleCollaborate = async () => {
        try {
            // Realizar la llamada a la API para crear la orden de pago en MercadoPago
            const response = await fetch('http://localhost:3001/create-order', {
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collaboration;
