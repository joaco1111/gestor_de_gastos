import Login from '../../components/Login/Login';
import LandingPage from "../../components/LandingPage/LandingPage";


const Landing = ({ loggin }) => {
    return(
        <div>
            <LandingPage/>

            <Login loggin={ loggin } />
        </div>
    )
};

export default Landing;