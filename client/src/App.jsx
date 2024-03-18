import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Collaboration, Log, Home, Landing } from './views';
import { login } from './redux/actions';
import IncomeExpenseView from './views/IncomeExpenseView/IncomeExpenseView';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.token);
    console.log(token);

    const loggin = async(credentials) => {
        await dispatch(login(credentials));
    };

    useEffect(() => {   
        if (token) {                                                                            // Me dirige a /home con el 1er click en el botón Loggin
            navigate('/home');
        }                                                                   // useEffect maneja el efecto secundario, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
    }, [navigate]);

    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/detailsLog' element={<IncomeExpenseView/>}/>
                <Route path='/home' element={token ? <Home /> : <Landing loggin={loggin} token={token} />}/>
                <Route path='/' element={<Landing loggin={loggin} token={token} />}/>
            </Routes>
        </div>
    )
};

export default App;