import { motion } from 'framer-motion'; 
import registroImage from '../../assets/register.png'; 
import homeImage from '../../assets/homefoto.png'; 
import movimientosImage from '../../assets/movfoto.png'; 
import './Sliders.css'; 

const Sliders = () => {
  return (
    <section id="how-it-works" className="container-slide">
      <div className="container">
        <h2 className="text-center mb-4">¿Cómo funciona?</h2>
        <div className="row">
          <motion.div className="col-md-6 order-2 order-md-1 text-md-right" initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <div className="step">
              <div className="step-icon-container">
                <div className="step-icon-circle">1</div>
              </div>
              <h3 className="step-title">Registrarse</h3>
              <p className="step-description">
                Selecciona la opción "<a href="http://localhost:5173/log" className="registration-link">Registrarse</a>" y completa el formulario con tus datos personales. O puedes ingresar con tu cuenta de Google.
              </p>
            </div>
          </motion.div>
          <motion.div className="col-md-6 order-1 order-md-2" initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <img src={registroImage} alt="Registro" className="img-fluid mb-3 float-md-right" />
          </motion.div>
        </div>
        <div className="row">
          <motion.div className="col-md-6 order-4 order-md-3 text-md-right" initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <div className="step">
              <div className="step-icon-container">
                <div className="step-icon-circle">2</div>
              </div>
              <h3 className="step-title">Home</h3>
              <p className="step-description">
                En Home podrás agregar tus ingresos o gastos. Deberás ingresar un monto, una fecha y la categoría a la que corresponde el ingreso o gasto. Como opcional, podrás agregar una descripción.
              </p>
            </div>
          </motion.div>
          <motion.div className="col-md-6 order-3 order-md-4" initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <img src={homeImage} alt="Home" className="img-fluid mb-3 float-md-right" />
          </motion.div>
        </div>
        <div className="row">
          <motion.div className="col-md-6 order-6 order-md-5 text-md-right" initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <div className="step">
              <div className="step-icon-container">
                <div className="step-icon-circle">3</div>
              </div>
              <h3 className="step-title">Movimientos</h3>
              <p className="step-description">
                En Movimientos podrás visualizar tus ingresos y tus gastos, ordenarlos por fecha y cantidad, filtrarlos por categoría. También podrás visualizar gráficos y promedios.
              </p>
            </div>
          </motion.div>
          <motion.div className="col-md-6 order-5 order-md-6" initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <img src={movimientosImage} alt="Movimientos" className="img-fluid mb-3 float-md-right" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sliders;
