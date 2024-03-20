import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Collaboration, Log, Login, Home, Landing } from './views';
import { login } from './redux/actions';
import IncomeExpenseView from './views/IncomeExpenseView/IncomeExpenseView';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    console.log(user);

    useEffect(() => {                                                                           //useEffect maneja el efecto secundario, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
        if (user.tokenUser) {                                                                   //Me dirige a /home con el 1er click en el botón Loggin
            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            );     
            navigate('/home');                                                                              
        }
    }, [user]);

    //Uso otro efecto que sólo sea para leer la localStorage y hacer que se actualice el estado global(user) para conservar sesión
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        console.log(loggedUserJSON);
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            console.log(user);
            const credentials = {
                email: user./*user.*/email,
                password: user./*user.*/password
            };
            console.log(credentials);
            if(user.tokenUser) dispatch(login(credentials));                                               //Actualizo el user del estado global
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/detailsLog' element={<IncomeExpenseView/>}/>
                <Route path='/home' element={user.tokenUser ? <Home/> : <Login />}/>
                <Route path='/' element={<Landing />}/>
            </Routes>
        </div>
    )
};

export default App;