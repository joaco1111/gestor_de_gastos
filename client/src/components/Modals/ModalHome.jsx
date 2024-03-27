import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalHome = ({ show, handleClose}) => {

    return(
        <Modal show={show}>            {/*onHide es la propiedad que le dice al Modal si se va a ver o no, show muestra u oculta el Modal(onHide es simplemente una propiedad) */}
            <Modal.Header >
                <Modal.Title>EXITO</Modal.Title>
            </Modal.Header>
            <Modal.Body>La acción se ha completado exitosamente</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
            </Modal.Footer>
        </Modal>
    )
};

export default ModalHome;