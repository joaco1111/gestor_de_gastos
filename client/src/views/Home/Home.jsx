import NavBar from "../../components/NavBar/NavBar";
import ExpenseForm from "../../components/Expense/ExpenseForm";
import IncomeForm from "../../components/Income/IncomeForm";
import style from './Home.module.css';
import MetricasActions from "../../components/Metricas/metricaActions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const localToken = await JSON.parse(window.localStorage.getItem('loggedNoteAppUser')) ;
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

    useEffect(()=> {
            getMetrica("gastos").then(res => setGastos(res));
            getMetrica("ingresos").then(res => setIngresos(res));
       
        
    },[actions])

    return (
        <div className={style.homeContainer}>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-4">
                        <IncomeForm />
                    </div>
                    <div className="col-md-4">
                        <ExpenseForm />
                    </div>
                </div>
            </div>

            <br />

            <div className="container">
                <h3 className="text-center">Descripción de movimientos</h3>
                <div>
                    <MetricasActions title={["Número Gastos", "Total Gastos"]}  number={gastos}/>
                    <MetricasActions title={["Número Ingresos", "Total Ingresos"]}  number={ingresos}/>
                </div>
            </div>


        </div>
    )
};

export default Home;
