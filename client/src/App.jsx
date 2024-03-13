import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Collaboration, Loggin, Log, Home, Landing } from './views';

function App() {
    const navigate = useNavigate();

    const [access, setAccess] = useState(false);

    const login = (obj, arr) => {
        const element = arr.find((user) => user.email === obj.email && user.phone === obj.password);
        if(element) {
            setAccess(true);
        }
    };

    useEffect(() => {                                                                     // useEffect maneja el efecto secundario que me permite, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
        if (access) {                                                                     // Me dirige a /home con el 1er click en el botón Loggin
            navigate('/home');
        }
    }, [access, navigate]);

    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/loggin' element={<Loggin login={ login }/>}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/' element={<Landing />}/>
            </Routes>
        </div>
    )
};

export default App;