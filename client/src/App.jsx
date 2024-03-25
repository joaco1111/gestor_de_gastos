import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Collaboration, Log, Login, Home, Landing } from './views';
import { login } from './redux/actions';
import IncomeExpenseView from './views/IncomeExpenseView/IncomeExpenseView';
import UserList from './components/UserList/UserList';
<<<<<<< HEAD
=======
import ActionDetail from './components/ActionDetail/ActionDetail';
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
<<<<<<< HEAD
    console.log(user,'user for google');

    useEffect(() => {                                                                           //useEffect maneja el efecto secundario, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
        if (user?.tokenUser) {                                                                   //Me dirige a /home con el 1er click en el botón Loggin
            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            );     
            navigate('/home');                                                                              
        }
    }, [user]);
=======
    const newUser = useSelector(state => state.newUser);
    console.log(user);
    console.log(newUser);

    useEffect(() => {                                                                           //useEffect maneja el efecto secundario, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
        if (user.tokenUser || newUser.tokenUser) {                                                                   //Me dirige a /home con el 1er click en el botón Loggin
            window.localStorage.setItem(
                'loggedNoteAppUser', user.tokenUser ? JSON.stringify(user) : JSON.stringify(newUser)
            );     
            navigate('/home');                                                                              
        }
    }, [user, newUser]);
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
    
    //Uso otro efecto que sólo sea para leer la localStorage y hacer que se actualice el estado global(user) para conservar sesión
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            
            const credentials = {
                email: user./*user.*/email,
                password: user./*user.*/password
            };
            
            if(user.tokenUser) dispatch(login(credentials));                                               //Actualizo el user del estado global
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/login' element={<Login />}/>
<<<<<<< HEAD
                <Route path='/detailsLog' element={user.tokenUser ? <IncomeExpenseView /> : <Login />}/>
                <Route path='/home' element={user.tokenUser ? <Home/> : <Login />}/>
=======
                <Route path='/detailsLog' element={user.tokenUser || newUser.tokenUser ? <IncomeExpenseView /> : <Login />}/>
                <Route path='/home' element={user.tokenUser || newUser.tokenUser ? <Home/> : <Login />}/>
                <Route path='/actions/:id' element={user.tokenUser || newUser.tokenUser ? <ActionDetail /> : <Login />} />
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
                <Route path='/users' element={<UserList />} />
                <Route path='/' element={<Landing />}/>
            </Routes>
        </div>
<<<<<<< HEAD
    )
}
=======
    )  
};
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5

export default App;