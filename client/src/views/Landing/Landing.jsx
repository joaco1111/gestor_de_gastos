import Loggin from '../../components/Loggin/Loggin';

import LandingPage from "../../components/LandingPage/LandingPage";


const Landing = ({ login }) => {
    return(
        <div>
            <LandingPage/>

            <Loggin login={ login } />
        </div>
    )
};

export default Landing;