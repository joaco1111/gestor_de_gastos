<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

//  función de cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tu_upload_preset_de_cloudinary');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', formData);
      setImage(response.data.secure_url);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <div>
        <label htmlFor="profile-image">Foto de Perfil:</label>
        <input type="file" id="profile-image" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Foto de Perfil" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
      </div>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
    </div>
  );
};

export default Profile;
=======
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

    try {

      await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/userUpdate/${localToken?.idUser}`, formData, config);
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
    <>
    
    <NavBar />

    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Title className="text-center mb-4">Perfil</Card.Title>

              {/* mensaje fallido o de exito */}
              {message && <div className={`alert alert-${message.variant}`} role="alert">{message.message}</div>}

              {
                actived && 
                <Form.Group className='position-relative mb-4'>
                  {/* boton cancelar editacion de perfil */}
                <CloseButton onClick={()=> {
                  setActived(false)
                  setPreviewImage(null)
                }} className='position-absolute top-0 end-0'/>
                {/* input seleccionar una foto */}
                <Form.Label htmlFor="profile-image">Editar foto de Perfil:</Form.Label>
                <Form.Control id="profile-image" type="file" accept="image/*" onChange={handleImagePreview} />

              </Form.Group>
              }

              <Form.Group className='mb-4 position-relative'>
                {/* visualizar la imagen  */}
                {previewImage === null ? (
                  userState.urlPhoto && <Image thumbnail  src={userState.urlPhoto} alt="Vista previa de la imagen" className="profile-preview-image" /> 
                ) : (
                <Image thumbnail  src={previewImage } alt="Vista previa de la imagen" className="profile-preview-image" />) }
                <br />
                  {/* boton editar o guardar la imagen */}
                <Button onClick={handleButtonProfile} variant="primary" value={actived ? "Guardar" : "Editar"} className='w-25  d-inline-block'>{actived ? "Guardar" : "Editar"}</Button>

              </Form.Group>

              <Form.Group className='mb-4 '>
                <CardSubtitle>Usuario:</CardSubtitle>
                <CardTitle>{userState.name}</CardTitle>
              </Form.Group>

              <Form.Group className='mb-4'>
                <CardSubtitle>Correo Electrónico:</CardSubtitle>
                <CardTitle>{userState.email}</CardTitle>
              </Form.Group>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Profile;
>>>>>>> 21334f20f6b4acd9de8ac8362c0598f62f39bb61
