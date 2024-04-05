import Header from "./Header";
import { Box } from "@mui/material";
import UserList from "../../components/UserList/UserList";




const Users  = () => {
   

    return(
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" aling="center">
                <Header title="USER LIST" subtitle="Welcome to your user list" />
            </Box>
            <UserList />
        </Box>
    )
}
export default Users;