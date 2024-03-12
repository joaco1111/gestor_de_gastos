import { Collaboration, Loggin, Log, Home, Landing } from './views'
import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div>
            <Routes>
                <Route path='/collaboration' element={<Collaboration />}/>
                <Route path='/loggin' element={<Loggin />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/' element={<Landing />}/>
            </Routes>
        </div>
    )
};

export default App;