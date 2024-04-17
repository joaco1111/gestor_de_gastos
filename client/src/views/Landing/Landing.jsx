import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll'; 
import { useNavigate, Link } from 'react-router-dom';
import landingfoto from "../../assets/backlanding.jpg"
// import logonav from "../../assets/GDG_fondo_negro.jpeg"
import Sliders from "../../components/slide/Sliders.jsx"
import "./landing.css"

const Landing = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const scrollToSection = () => {
        scroll.scrollTo(1000); // Ajusta la posición según tu diseño
    };

    return(
        <div className="container-fluid overflow-hidden" style={{ backgroundColor: '#ffb703', height: 'auto', fontFamily: 'Arial' }}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">Gestor de gastos</Link> 
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="justify-content-center" id="navbarSupportedContent">
                        <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <ScrollLink to="como-funciona" smooth={true} duration={500} className="nav-link text-black">¿Cómo funciona?</ScrollLink>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-black">Login</Link> 
                            </li>
                        </ul>
                        </div>
                </div>
            </nav>


            <div className="row" style={{ backgroundImage: `url(${landingfoto})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', color: 'white', minHeight: '100vh', display: 'flex', alignItems:"center" }}>
                <div className="col-sm-12 col-md-6 col-lg-6 mx-auto">
                    <div style={{ maxWidth: '500px', padding: '20px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                        <h2 style={{fontSize: '44px', fontWeight: 'bold', marginBottom: '10px'}}>Gestor de gastos</h2>
                        <h3 style={{fontSize: '20px', marginBottom: '20px'}}>Tu nuevo aliado para el control financiero personal. Con nuestra plataforma, podrás llevar un registro detallado de tus ingresos y gastos, brindándote una visión clara y organizada de tus finanzas.</h3>
                    </div>
                </div>
            </div>
           
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

            <div className="row hvr-grow">
                <div className="col-sm-12 col-md-12 col-lg-12" style={{backgroundColor: '#219ebc', color: 'white', padding: '20px'}}>
                    <h1 className="text-center">Proyecto final</h1>
                    <h3 className="text-center"></h3>
                </div>
            </div>
        </div>
    )
};

export default Landing;
