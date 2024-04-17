import Review from "../../components/reviewadmin/review";
import Header from "./Header";
import { Box } from "@mui/material";




const ReviewAdmin  = () => {
   

    return(
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" aling="center">
                <Header title="COMMUNITY" subtitle="Details of comments" />
            </Box>
            <Review />
        </Box>
    )
}
export default ReviewAdmin;