import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll'; 
import { useNavigate, Link } from 'react-router-dom';
import landingfoto from "../../assets/backlanding.jpg";
import Sliders from "../../components/slide/Sliders.jsx";
import Marca from "../../assets/title.pf.jpg";
import React, { useState } from 'react';
import "./landing.css";

const Landing = () => {

    const [exampleState, setExampleState] = useState('initialValue');

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const scrollToSection = () => {
        scroll.scrollTo(1000); // Ajusta la posición según tu diseño
    };

    return(
        <>
<div className="container-fluid overflow-hidden" style={{ backgroundColor: '#03045E', height: 'auto', fontFamily: 'Arial' }}>
<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#03045E', color: 'white' }}>
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ color: 'white' }}>GastoGenius</Link>
        <button className="navbar-toggler" type="button" onClick={handleToggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <ScrollLink to="como-funciona" smooth={true} duration={500} className="nav-link text-white" onClick={() => setIsMenuOpen(false)}>¿Cómo funciona?</ScrollLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

            <div className="row" style={{ backgroundColor: '#B3E5FC', backgroundImage: `url(${landingfoto})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', color: 'white', minHeight: '100vh', display: 'flex', alignItems:"center" }}>
                <div className="col-sm-12 col-md-6 col-lg-6 mx-auto">
                    <div style={{ maxWidth: '500px', padding: '20px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                        <h2 style={{fontSize: '44px', fontWeight: 'bold', marginBottom: '10px'}}>Gestor de gastos</h2>
                        <h3 style={{fontSize: '20px', marginBottom: '20px'}}>Tu nuevo aliado para el control financiero personal. Con nuestra plataforma, podrás llevar un registro detallado de tus ingresos y gastos, brindándote una visión clara y organizada de tus finanzas.</h3>
                        <button onClick={handleLogin} className="btn btn-primary">Empieza ahora</button>
                    </div>
                </div>
            </div>
            </div>
           <div className='page'>
            <div className="row mt-5" id="como"> 
                <div className="col-sm-12 col-md-6 col-xl-6 d-flex flex-column justify-content-center" style={{maxWidth: '400px', height: '400px', margin: 'auto'}}>
                    <h2 style={{fontSize: '24px', marginBottom: '10px'}}>Registro de Ingresos y Gastos</h2>
                    <p style={{fontSize: '16px'}}>Registra fácilmente tus ingresos, ya sea tu salario mensual, ingresos adicionales o regalos inesperados. Además, categoriza tus gastos en áreas como alimentos, transporte, salud y más para obtener una visión detallada de tus hábitos financieros.</p>
                    <h2 style={{fontSize: '24px', marginBottom: '10px'}}>Inicio de Sesión Seguro</h2>
                    <p style={{fontSize: '16px'}}>Para garantizar la privacidad de tus datos, hemos implementado un sistema de inicio de sesión seguro. Ingresa con confianza y accede a todas las herramientas que necesitas para manejar tus ingresos y gastos.</p>
                </div>
                <div className="col-sm-12 col-md-6 col-xl-6 d-flex flex-column justify-content-center" style={{maxWidth: '400px', height: '400px', margin: 'auto'}}>
                    <h2 style={{fontSize: '24px', marginBottom: '10px'}}>Reportes Detallados</h2>
                    <p style={{fontSize: '16px'}}>Accede a informes detallados que te permitirán analizar tu comportamiento financiero a lo largo del tiempo. Identifica patrones, establece metas y realiza ajustes para alcanzar tus objetivos financieros.</p>
                    <h2 style={{fontSize: '24px', marginBottom: '10px'}}>Acceso desde cualquier dispositivo</h2>
                    <p style={{fontSize: '16px'}}>Gestiona tus finanzas en cualquier lugar y momento. Nuestra plataforma es accesible desde dispositivos móviles y computadoras, lo que te brinda la flexibilidad que necesitas.</p>
                </div>
            </div>

            <Element name="como-funciona" className="elemento-destino">
                <Sliders/>
            </Element>
        </div>
        
        <div className="footer">
          <div className="col-sm-12 col-md-12 col-lg-12" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <img src={Marca} alt="GastoGenius" />
            <div style={{ marginTop: '5px' }}> 
            <a href="https://github.com/joaco1111/gestor_de_gastos" className="text-white" style={{ textDecoration: 'none' }}>Repositorio de github</a>
          </div>
            </div>
                <div className="card front-card">
                <p>Frontend Squad</p>
                <a href="https://www.linkedin.com/in/joaquín-agustín-ortega-23a426264" className="text-white" style={{ textDecoration: 'none' }}>Joaquin Ortega</a>
                <a href="https://www.linkedin.com/in/julian-santiago-navarro-martínez-844963203" className="text-white" style={{ textDecoration: 'none' }}>Julian Navarro</a>
                <a href="https://www.linkedin.com/in/javier-arangue-ba9897108/" className="text-white" style={{ textDecoration: 'none' }}>Javier Arangue</a>
                <a href="https://www.linkedin.com/in/alen-oviedo-lagos-7342a316a/" className="text-white" style={{ textDecoration: 'none' }}>Alen Oviedo Lagos</a>
            </div>
            <div className="card back-card">
                <p>Backend Squad</p>
                <a href="https://www.linkedin.com/in/mariano-velarde-fullstack/" className="text-white" style={{ textDecoration: 'none' }}>Mariano velarde</a>
                <a href="https://www.linkedin.com/in/leonardo-fleire-morales/" className="text-white" style={{ textDecoration: 'none' }}>Leonardo Fleire</a>
                <a href="https://www.linkedin.com/in/sebasti%C3%A1n-garcia-7842a6259/" className="text-white" style={{ textDecoration: 'none' }}>Sebastian Alfonso</a>
                <a href="https://www.linkedin.com/in/ricardosumoza-2136aa240/" className="text-white" style={{ textDecoration: 'none' }}>Ricardo Sumoza
</a>
            </div>
            <div className="technologies">
    <p>Tecnologias Usadas</p>
    <div className="technology-container">
        <div className="technology">
            <img src="https://imgs.search.brave.com/m9mf5csO1lewpnxjgU0jvpdnkyk0LLovGh3BqJnL5qo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9zZXF1ZWxp/emUtaWNvbi00NDN4/NTEyLXBqa2Rnc3U1/LnBuZw" alt="Sequelize" />
            <span>Sequelize</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript" />
            <span>JavaScript</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/react-native.png" alt="React.js" />
            <span>React.js</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/html-5.png" alt="HTML" />
            <span>HTML</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Node.js" />
            <span>Node.js</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/express.png" alt="Express" />
            <span>Express</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/material-ui.png" alt="Material UI" />
            <span>Material UI</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/bootstrap.png" alt="Bootstrap" />
            <span>Bootstrap</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/redis.png" alt="Redis" />
            <span>Redis</span>
        </div>
        <div className="technology">
            <img src="https://img.icons8.com/color/48/000000/css-filetype.png" alt="CSS" />
            <span>CSS</span>
        </div>
    </div>


</div>


            </div>
        </>
    )
};

export default Landing;
