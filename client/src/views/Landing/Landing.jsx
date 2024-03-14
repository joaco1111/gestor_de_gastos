import Loggin from '../../components/Loggin/Loggin';

const Landing = ({ login }) => {
    return(
        <div>
            <h1>Vista de presentación</h1>

            <Loggin login={ login } />
        </div>
    )
};

export default Landing;