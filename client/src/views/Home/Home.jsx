import NavBar from "../../components/NavBar/NavBar";
import ExpenseForm from "../../components/Expense/ExpenseForm";
import IncomeForm from "../../components/Income/IncomeForm";
import style from './Home.module.css';
import MetricasActions from "../../components/Metricas/metricaActions";
import Chat from '../../components/Chat/Chat'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Balance from "../../components/Balance/Balance";
import { Box, Grid, Typography} from "@mui/material";
import { fetchActions } from "../../redux/actions";
import ExpensePieChart from "../../components/Charts/ExpensePieChart";
import IncomePieChart from "../../components/Charts/IncomePieChart";
import BalanceMensual from "../../components/Balance/BalanceMensual";
// import ChatAdmin from '../ChatAdmin/ChatAdmin'
import Account from "../../components/Account/Account";
import DetailsAccount from "../../views/AccountDetail/DetailsAccount"

const localToken =  JSON.parse(window.localStorage.getItem('loggedNoteAppUser')) ;
const config = {
      headers: {
        token: localToken?.tokenUser
      }
    }

const getMetrica = async(type) => {
    try {
        
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/actions/metricas?type=${type}`, config)
        
        if(typeof data === "string") return [0,0];
        return [data.count, data.total];
    } catch (error) {
        console.log(error);
    }
}


const Home = () => {
    const actions = useSelector(state => state.actions);
    const [gastos, setGastos] = useState([])
    const [ingresos, setIngresos] = useState([])
    const user = useSelector(state => state.user);
    const currentMonth = new Date().getMonth();


    useEffect(()=> {
        if(localToken){
            getMetrica("gastos").then(res => setGastos(res));
            getMetrica("ingresos").then(res => setIngresos(res));
        }
    },[actions])

    const dispatch = useDispatch();

    useEffect (() =>{
        dispatch(fetchActions(1,100))
    }, [dispatch])

    return (
        //Grid container es la fila
        //Grid item representa a la columna
        <div className="content-container" style={{ position: 'relative', top: '75px' }}>
        <Box>
            <Grid item xs={12}>
                <NavBar />
            </Grid>

        <Grid container spacing={2} justifyContent="center">
            
            <Grid item xs={12} sm={6} md={3}>
                <Box p={3}>
                    <Balance />
                </Box>
            </Grid>
            
           
        </Grid>

        <Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} md={6}>
    <Box p={3} className="form">
      <IncomeForm />
    </Box>
  </Grid>
  <Grid item xs={12} md={6}>
    <Box p={3} className="form">
      <ExpenseForm />
    </Box>
  </Grid>
</Grid>

<Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} sm={6} md={6} lg={3}>
    <Box p={3} className="chart">
      <IncomePieChart />  
    </Box>
  </Grid>
  <Grid item xs={12} sm={6} md={6} lg={3}>
    <Box p={3} className="chart">
      <ExpensePieChart />
    </Box>
  </Grid>
</Grid>

<Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} sm={6} md={4}>
    <Box p={3} className="chart">
      <BalanceMensual selectedMonth={currentMonth} /> 
    </Box>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <Box p={3} className="chart">
      <Account />
    </Box>
  </Grid>
</Grid>

        


        
{/* 
        {user.idAccess === 1 ? (
            <ChatAdmin/>
        ) : (
            <Chat/> 
        )} */}

    </Box>
</div>
    )

        // <div className={style.homeContainer}>
        //     <NavBar />
        //     <Box display="flex" flexDirection="column" alignItems="center">
              
        //         <Box mb={2}>
        //             <Balance />
                   
        //         </Box>
        //         <Box  mb={4}>
                  
        //             <CalendarComponent/>
        //         </Box>

                
        //         <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        //             <Box mr={2}>
        //                 <IncomeForm />
        //             </Box>
        //             <Box ml={2}>
        //                 <ExpenseForm />
        //             </Box>
        //         </Box>

        //         <div className="container mt-4">
        //             <h3 className="text-center">Descripción de movimientos</h3>
        //             <div>
        //                 <MetricasActions title={["Número Gastos", "Total Gastos"]} number={gastos} />
        //                 <MetricasActions title={["Número Ingresos", "Total Ingresos"]} number={ingresos} />
        //             </div>
        //         </div>
        //     </Box>
            

}  


export default Home;