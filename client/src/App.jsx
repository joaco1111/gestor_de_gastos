import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Collaboration, Log, Home, Landing } from './views';
import IncomeExpenseView from './views/IncomeExpenseView/IncomeExpenseView';

function App() {
    const navigate = useNavigate();

    const [access, setAccess] = useState(false);

    const login = ({access, token}) => {
        //si hay un acceso, cambiamos el estado a true para entrar al home guardando el token en el localStorage
        if(access) {
            setAccess(true);
            localStorage.setItem('token', JSON.stringify(token))
        }
    };

    useEffect(() => {                                                                           // useEffect maneja el efecto secundario, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
        if (access) {                                                                           // Me dirige a /home con el 1er click en el botón Loggin
            navigate('/home');
        }
    }, [access, navigate]);

    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/detailsLog' element={<IncomeExpenseView/>}/>
                <Route path='/home' element={access ? <Home />: <Landing login={login}/>}/>     {/*Si tengo acceso renderizo /home, de lo contrario muestro Landing*/}
                <Route path='/' element={<Landing login={login}/>}/>
            </Routes>
        </div>
    )
};

export default App;