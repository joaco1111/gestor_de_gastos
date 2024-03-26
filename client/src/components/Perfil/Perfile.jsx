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
