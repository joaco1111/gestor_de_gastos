import { Link } from 'react-router-dom';
//import Login from '../../components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import LandingPage from "../../components/LandingPage/LandingPage";

const Landing = () => {
    return(
        <div className="container-fluid overflow-hidden" style={{ backgroundColor: '#ffb703', height: 'auto' }}>
            <div className="row" >
                <div className="col-sm-12 col-md-12 col-lg-12 my-3">
                    <h1 className="text-center">TE AYUDAMOS CON TU ECONOMIA</h1>
                </div>
                <div className="row my-2 hvr-grow" style={{ backgroundColor: '#219ebc', color: 'white', minHeight: '500px', marginRight: '0', marginLeft: '0' }}>
                    <div className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center" style={{maxWidth: '500px', margin: 'auto'}}>
                        <h2>Gestor de gastos</h2>
                        <h3>Tu nuevo aliado para el control financiero personal. Con
                            nuestra plataforma, podras llevar un registro detallado de
                            tus ingresos y gastos, brindandote una vision clara y
                            organizada de tus finanzas.</h3>
                        <div style={{paddingTop: '20px'}}>
                            <Link to="log"><button type="button" class="btn btn-dark">Sign up</button></Link>
                        </div>
                    </div>
                    {/* <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center" style={{maxWidth: '500px', margin: 'auto', padding: '20px'}}>
                        <Login loggin={loggin} />
                    </div> */}
                </div>
            </div>
            <div className="row hvr-grow" style={{color: 'white'}}>
                <div className="col-sm-12 col-md-6 col-xl-6 d-flex flex-column justify-content-center" style={{maxWidth: '400px', height: '400px', margin: 'auto'}}>
                    <h2 style={{fontSize: '110%'}}>Registro de Ingresos y Gastos</h2>
                    <h3 style={{fontSize: '100%'}}>Registra fácilmente tus ingresos, ya sea tu salario mensual, 
                        ingresos adicionales o regalos inesperados. Además, categoriza 
                        tus gastos en áreas como alimentos, transporte, salud y más
                        para obtener una visión detallada de tus hábitos financieros.</h3>
                    <h2 style={{fontSize: '110%'}}>Inicio de Sesión Seguro</h2>
                    <h3 style={{fontSize: '100%'}}>Para garantizar la privacidad de tus datos, hemos implementado 
                        un sistema de inicio de sesión seguro. Ingresa con confianza y 
                        accede a todas las herramientas que necesitas para manejar tus
                        ingresos y gastos.</h3>
                </div>
                <div className="col-sm-12 col-md-6 col-xl-6 d-flex flex-column justify-content-center" style={{maxWidth: '400px', height: '400px', margin: 'auto'}}>
                    <h2 style={{fontSize: '110%'}}>Reportes Detallados</h2>
                    <h3 style={{fontSize: '100%'}}>Accede a informes detallados que te permitirán analizar tu 
                        comportamiento financiero a lo largo del tiempo. Identifica 
                        patrones, establece metas y realiza ajustes para alcanzar tus 
                        objetivos financieros.</h3>
                    <h2 style={{fontSize: '110%'}}>Acceso desde cualquier dispositivo</h2>
                    <h3 style={{fontSize: '100%'}}>Gestiona tus finanzas en cualquier lugar y momento. Nuestra 
                        plataforma es accesible desde dispositivos móviles y computadoras, 
                        lo que te brinda la flexibilidad que necesitas.</h3>
                </div>
            </div>
            <div className="row hvr-grow">
                <div className="col-sm-12 col-md-12 col-lg-12" style={{backgroundColor: '#219ebc', color: 'white', padding: '20px'}}>
                    <h1 className="text-center">Team PF</h1>
                    <h3 className="text-center">Do the things you do, but better</h3>
                </div>
            </div>
        </div>
    )
};

export default Landing;