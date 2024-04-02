import { Card, Form, Container, Row, Col, Button } from 'react-bootstrap';
import './Perfile.css'; 
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from 'react';
import axios from 'axios';

const localToken = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
    headers: {
      token: localToken?.tokenUser
    }
};


const Profile = () => {
  const [previewImage, setPreviewImage ] = useState(null);
  const [imagen, setImagen] = useState('');
  const [userState, setUserState] = useState({
    name: "",
    urlPhoto: null,
    email: ""
  })
  const [message, setMessage] = useState(null); // Definición de setMessage

  const getUser = async()=> {
    try {
      const user = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/user/${localToken?.idUser}`, config);

      setUserState({
        name: user.data.name,
        urlPhoto: user.data.photoProfile,
        email: user.data.email
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(()=> {
    setTimeout(()=> {
      setMessage(null);
    }, 4000)
  }, [message])

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

    } else {
      setPreviewImage(null)
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', imagen);

    try {

      await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/userUpdate/${localToken?.idUser}`, formData, config);
      setMessage({ message: "Foto de perfil actualizada.", variant: "success" });

    } catch (error) {
      setMessage({ message: "Error al actualizar la foto de perfil.", variant: "danger" });
    }
  }



  return (
    <>
    
    <NavBar />

    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Title className="text-center">Perfil</Card.Title>

              {message && <div className={`alert alert-${message.variant}`} role="alert">{message.message}</div>}

              <Form.Group>
                <Form.Label htmlFor="profile-image">Foto de Perfil:</Form.Label>
                <Form.Control id="profile-image" type="file" accept="image/*" onChange={handleImagePreview} />
                
                {previewImage === null ? (
                  userState.urlPhoto && <img src={userState.urlPhoto} alt="Vista previa de la imagen" className="profile-preview-image" /> 
                ) : (
                <img src={previewImage } alt="Vista previa de la imagen" className="profile-preview-image" />) }

                {/* {previewImage && <img src={previewImage || userState?.photoProfile} alt="Vista previa de la imagen" className="profile-preview-image" />} */}

              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre de Usuario: {userState.name}</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo Electrónico: {userState.email}</Form.Label>
              </Form.Group>
              <Button onClick={handleSubmit} variant="primary">Guardar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Profile;