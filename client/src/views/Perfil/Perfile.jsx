import { Card, Form, Container, Row, Col, Button } from 'react-bootstrap';
import './Perfile.css'; 
import NavBar from "../../components/NavBar/NavBar";
import { useState } from 'react';
import axios from 'axios';


const localToken = await JSON.parse(window.localStorage.getItem('loggedNoteAppUser')) ;
//console.log(localToken);

const config = {
      headers: {
        token: localToken?.tokenUser
      }
    }

const Profile = () => {
 const [previewImage, setPreviewImage ] = useState(null);
  
 const [ imagen , setImagen ] = useState('') ;
 
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
    }
  };
  
  const handleSubmit = async () =>{
    const fromData = new  FormData();
      fromData.append( 'image', imagen )
      try{
        const  response= await axios.put(`http://localhost:3001/auth/userUpdate/${localToken?.idUser}`,fromData, config)
        //console.log(response)
      } catch (error) {
    console.log('Error enviar foto' , error);
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
