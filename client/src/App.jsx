import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Collaboration, Log, Login, Home, Landing, Activity, Balanz, PendingExpenseList } from './views';
// import ChatAdmin from './views/ChatAdmin/ChatAdmin';
import IncomeExpenseView from './views/IncomeExpenseView/IncomeExpenseView';
import UserList from './components/UserList/UserList';
import ActionDetail from './components/ActionDetail/ActionDetail';
import Administrador from './views/Administrador/Administrador';
import Profile from './components/Perfil/Perfile';
import Failure from './views/Collaboration/Failure';
import Success from './views/Collaboration/Failure';
import Review from './components/Review/ReviewFrom';
import "./App.css"
import { fetchActions, login } from './redux/actions';
import DetailsAccount from './views/AccountDetail/DetailsAccount';



function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1); // Inicializar currentPage en 1
    const limitPerPage = 5;
    const loading = useSelector(state => state.loading);
    const [filters, setFilters] = useState({
      date: '',
      type: '',
      category: '',
    });
    const [orderDirection, setOrderDirection] = useState('DESC');
    const [orderBy, setOrderBy] = useState('');

    const user = useSelector(state => state.user);
    console.log('este es el user', user);
    
    useEffect(() => {    
        console.log('ahora', user);                                                             //useEffect maneja el efecto secundario, la fn(1er argumento del hook) se ejecuta después de que el componente se haya renderizado por primera vez y después de cada actualización del estado access
        if (user.tokenUser) {  
            console.log(user);                                              //Me dirige a /home con el 1er click en el botón Loggin
            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));   
            //navigate('/home'); 
            if(location.pathname === '/login' || location.pathname === '/log' ) navigate('/home');
            if(location.pathname === '/detailsLog') navigate('/detailsLog');
            if(location.pathname === '/collaboration') navigate('/collaboration');   
            if(location.pathname === '/admin/*') navigate('/admin/*');                                                                           
        }
    }, [user]);

    //Uso otro efecto que sólo sea para leer la localStorage y hacer que se actualice el estado global(user) para conservar sesión
    useEffect(async() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            
            const credentials = {
                email: user.email,
                password: user.password
            };
            
            if(user.tokenUser) {
                await dispatch(login(credentials, "login"));
                //await dispatch(fetchActions('', ''))
            }                                               //Actualizo el user del estado global
        }
    }, []);

    useEffect(() => {
        // Función asincrónica para cargar acciones del usuario
        const loadUserActions = async () => {
            // Si el usuario tiene un token válido
            if (user.tokenUser) {
                // Intenta obtener las acciones del usuario
                try {
                    // Despacha la acción para cargar las acciones del usuario
                    await dispatch(fetchActions(currentPage, limitPerPage, filters, orderDirection, orderBy));
                } catch (error) {
                    // Manejo de errores, puedes mostrar un mensaje de error o realizar alguna otra acción
                    console.error("Error al cargar las acciones del usuario:", error);
                }
            }
        };

        // Llama a la función para cargar las acciones del usuario
        loadUserActions();
    }, [dispatch, user.tokenUser]); // Dependencias del efecto

    return (
        <div>
            <Routes>
                <Route path ='/success' element={<Success/>}/>
                <Route path='/failure' element={<Failure/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/expensePending' element={user.tokenUser ? <PendingExpenseList /> : <Login />}/>
                <Route path='/review' element={user.tokenUser ? <Review /> : <Login />}/>
                <Route path='/collaboration' element={user.tokenUser ? <Collaboration /> : <Login />}/>
                <Route path='/admin/*' element={user.tokenUser ? <Administrador /> : <Login />}/>
                <Route path='/detailsLog' element={user.tokenUser ? <IncomeExpenseView /> : <Login />}/>
                <Route path='/home' element={user.tokenUser ? <Home/> : <Login />}/>
                <Route path='/actions/:id' element={user.tokenUser ? <ActionDetail /> : <Login />} />
                <Route path='/users' element={user.tokenUser ? <UserList /> : <Login />} />
                <Route path='/profile' element={user.tokenUser ? <Profile /> : <Login />} />
                <Route path='/activity' element={user.tokenUser ? <Activity /> : <Login />} />
                <Route path='/expensePending' element={user.tokenUser ? <PendingExpenseList/> : <Login />} />
                <Route path='/balanz' element={user.tokenUser ? <Balanz/> : <Login />} />
                <Route path='/expensePending' element={user.tokenUser ? <PendingExpenseList/> : <Login />} />
                <Route path='/account' element={user.tokenUser ? <DetailsAccount/> : <Login />} />
                <Route path='/' element={user.tokenUser ? <Landing /> : <Landing />}/>
                {/* <Route path='/chat' element={user.token ? <ChatAdmin/> : <ChatAdmin/>}/> */}
            </Routes>
        </div>
    )  
}

export default App;