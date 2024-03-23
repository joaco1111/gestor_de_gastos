import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalsDisable = ({id, activated, title, body,functionAccess, setAccess}) => {

    return (
    <Modal show={activated} >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=> setAccess(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={()=> functionAccess(id)}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
)
}

export default ModalsDisable;