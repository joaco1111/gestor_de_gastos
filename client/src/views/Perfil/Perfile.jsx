import { Card, Form, Container, Row, Col, Button, CardHeader, CardTitle, CardSubtitle } from 'react-bootstrap';
import './Perfile.css'; 
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import CloseButton from 'react-bootstrap/CloseButton';

const localToken = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
    headers: {
      token: localToken?.tokenUser
    }
};


const Profile = () => {
  const userData = useSelector(state => state.user);
  const [previewImage, setPreviewImage ] = useState(null);
  const [actived, setActived] = useState(false)
  const [imagen, setImagen] = useState('');
  const [userState, setUserState] = useState({
    name: "",
    urlPhoto: null,
    email: ""
  })
  const [message, setMessage] = useState(null); // Definición de setMessage

  const getUser = async()=> {
    try {
      const user = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/user/${userData.idUser}`, config);
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
    formData.append('type', 'imagen')

    try {

      await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/userUpdate/${localToken?.idUser}?type=imagen`, formData, config);
      setMessage({ message: "Foto de perfil actualizada.", variant: "success" });

    } catch (error) {
      setMessage({ message: "Error al actualizar la foto de perfil.", variant: "danger" });
      setPreviewImage(null)
    }
  }

  const handleButtonProfile = (e) => {
    if(e.target.value === "Guardar") {
      handleSubmit(e);
      return setActived(false)
    }
    
    return setActived(true)
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
