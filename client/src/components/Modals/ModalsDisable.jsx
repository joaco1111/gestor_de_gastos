import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalsDisable = ({id, activated, title, body,functionAccess, setAccess, colors}) => {

    return (
    <Modal show={activated} >
        <Modal.Header style={{ backgroundColor: colors.primary[900], color: colors.grey[100] }}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: colors.grey[700] }}>{body}</Modal.Body>
        <Modal.Footer style={{ backgroundColor: colors.primary[900], borderTop: `1px solid ${colors.grey[200]}` }}>
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