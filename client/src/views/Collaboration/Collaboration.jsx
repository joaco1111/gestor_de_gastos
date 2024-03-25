// import "./Donar.css"
<<<<<<< HEAD

const Donacion = () => {
    return (
        <div className="card-donacion-container">
            <div className="card-donacion">
                <div className="card">
                <img src="" alt="Donacion Image" />
                <h3>Haz tu donacion</h3>
                <p className= 'monto'>50,00 €</p>
                <button>Donar</button>
                </div>
            </div>
        </div>
        
    )
}

export default Donacion;
=======
import React from 'react';

const Collaboration = () => {
    const token = JSON.parse(localStorage.getItem('loggedNoteAppUser')).tokenUser;

    const handleCollaborate = async () => {
        // Realizar la llamada a la API para crear la orden de pago en MercadoPago
        const response = await fetch('http://localhost:3001/create-order', {
            method: 'POST',
             
            headers: {
                'Content-Type': 'application/json',
                token
            }
        });
        const data = await response.json();

        // Redirigir a la página de pago de MercadoPago
        window.open(data.init_point, '_blank');
    };

    return (
        <div className="card-donacion-container">
            <div className="card-donacion">
                <div className="card">
                    <img src="" alt="Donacion Image" />
                    <h3>Haz tu donacion</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis commodi pariatur cupiditate voluptate ipsam eveniet rem, consectetur alias placeat laboriosam veritatis quam quaerat. A fugit ratione molestiae ipsam exercitationem nostrum.</p>
                    <button className="btn btn-primary" onClick={handleCollaborate}>Colaborar</button>
                </div>
            </div>
        </div>
    );
};

export default Collaboration;
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
