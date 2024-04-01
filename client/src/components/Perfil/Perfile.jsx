import { Card, Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import './Perfile.css'; 
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from 'react';
import axios from 'axios';


const localToken = await JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
      headers: {
        token: localToken?.tokenUser
      }
    }

const Profile = () => {
  const [previewImage, setPreviewImage ] = useState(null);
  const [message, setMessage] = useState(null);
  const [ imagen , setImagen ] = useState('') ;


  useEffect(()=> {
      setTimeout(()=> {
        setMessage(null);
      }, 3000)
    }, [])

  // Vista previa de la imagen
  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      setImagen(file);

      reader.onloadend = () => {
        setPreviewImage(reader.result);
        };

        reader.readAsDataURL(file);

      }else {
        setPreviewImage(null)
      }
    };

    const handleSubmit = async () =>{
      const formData = new  FormData();
        formData.append( 'image', imagen )

        
        try{
          const id = localToken?.idUser;
          await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/userUpdate/${id}`, formData, config)
          
          return setMessage({message: "Foto de perfil actualizada.", variant: "success"});

        } 
        catch (error) {
          setMessage({message: "Error al actualizar la foto de perfil.", variant: "danger"});
        }
    }

    return (
      <Container>
        <NavBar />
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="profile-card">
              <Card.Body>
                <Card.Title className="text-center">Perfil</Card.Title>
                {message && <Alert variant={message.variant}>{message.message}</Alert>}
                <Form.Group>
                  <Form.Label>Foto de Perfil:</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={ handleImagePreview } />
                  {previewImage && <img src={previewImage} alt="Vista previa de la imagen" className="profile-preview-image" />}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Aca va el nombre</Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Aca va el correo electrónico</Form.Label>
                </Form.Group>
                <Button onClick={()=>handleSubmit()} variant="primary">Guardar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default Profile;