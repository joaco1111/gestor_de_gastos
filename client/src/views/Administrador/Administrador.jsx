import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./Sidebar"
import DashBoard from "./DashBoard"
import Team from "./Team";
// import Invoices from "./Invoices"
// import Contacts from "./Contacts"
// import Bar from "./Bar"
// import Form from "./Form"
// import Line from "./Line"
// import Pie from "./Pie"
// import Faq from "./Faq"
// import Calendar from "./Calendar"
// import Geography from "./Geography"



const Administrador  = () => {
    const [theme, colorMode] = useMode()
    return( 
        <ColorModeContext.Provider  value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>   
            <div style={{display: 'flex'}}>
                <SideBar/>     
                <div className="contents">
                <TopBar/>
                    <Routes>
                        <Route path="/admin" element={<DashBoard/>}/>
                        <Route path="/team" element={<Team/>}/>

                        {/* <Route path="/contacts" element={<Contacts/>}/> */}
                        {/* <Route path="/invoices" element={<Invoices/>}/> */}
                        {/* <Route path="/form" element={<Form/>}/> */}
                        {/* <Route path="/bar" element={<Bar/>}/> */}
                        {/* <Route path="/pie" element={<Pie/>}/> */}
                        {/* <Route path="/line" element={<Line/>}/> */}
                        {/* <Route path="/geography" element={<Geography/>}/> */}
                        {/* <Route path="/faq" element={<Faq/>}/> */}
                        {/* <Route path="/calendar" element={<Calendar/>}/> */}
                        
                    </Routes>
                </div>
                
            </div>

            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
export default Administrador;