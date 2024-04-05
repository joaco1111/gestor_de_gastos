import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./Sidebar"
import DashBoard from "./DashBoard"
import Team from "./Team";
import Users from "./Users"
// import Contacts from "./Contacts"
// import Bar from "./Bar"
// import Form from "./Form"
// import Line from "./Line"
import Pie from "./pie/Pie"
// import Faq from "./Faq"
import Calendar from "./Calendar"
import Geography from "./geo/Geography.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions.js";
import Transactions from "./Transactions.jsx";


const Administrador  = () => {
    const [theme, colorMode] = useMode()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(""));
    }, []);
    return( 
        // <ColorModeContext.Provider  value={colorMode}>
        //     <ThemeProvider theme={theme}>
                // <CssBaseline/>   
            <div style={{display: 'flex'}}>
                <SideBar/>     
                <div className="content">
                <TopBar/>
                    <Routes>
                        <Route path="/" element={<DashBoard/>}/>
                        <Route path="/team" element={<Team/>}/>
                        <Route path="/userslist" element={<Users/>}/>
                        <Route path="/transactions" element={<Transactions/>}/>
                        {/* <Route path="/invoices" element={<Invoices/>}/> */}
                        {/* <Route path="/form" element={<Form/>}/> */}
                        {/* <Route path="/bar" element={<Bar/>}/> */}
                        <Route path="/pie" element={<Pie/>}/>
                        {/* <Route path="/line" element={<Line/>}/> */}
                        <Route path="/geography" element={<Geography/>}/>
                        {/* <Route path="/faq" element={<Faq/>}/> */}
                        <Route path="/calendar" element={<Calendar/>}/>      
                    </Routes>
                </div>
                
            </div>

           //</ThemeProvider>
       // </ColorModeContext.Provider> 
    )
}
export default Administrador;