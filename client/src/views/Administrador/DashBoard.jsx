import Header from "./Header";
import { Box } from "@mui/material";
import UserList from "../../components/UserList/UserList";
import TopBar from "./TopBar";
import Team from "./Team";


const DashBoard  = () => {
    return(
        <Box m="20px" >
            <Box display="flex" justifyContent="space-between" aling="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
            <Box height="200px">
                <UserList/>
            </Box>
            <Box height="200px">
               
            </Box>
            </Box>
            
        </Box>
    )
}
export default DashBoard;