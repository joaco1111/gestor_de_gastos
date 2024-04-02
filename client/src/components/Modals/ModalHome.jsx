import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalHome = ({ show, handleClose}) => {

    return(
        <Modal show={show}>            {/*onHide es la propiedad que le dice al Modal si se va a ver o no, show muestra u oculta el Modal(onHide es simplemente una propiedad) */}
            <Modal.Header>
                <Modal.Title style={{ margin: '0 auto', textAlign: 'center', width: '100%' }}>EXITO</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>La acción se completó exitosamente</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
            </Modal.Footer>
        </Modal>
    )
};

export default ModalHome;