import ExpenseForm from "../../components/Expense/ExpenseForm";
import IncomeForm from "../../components/Income/IncomeForm";
import PieChartsExpense from "../../components/Charts/PieChartsExpense";
import PieChartsIncome from "../../components/Charts/PieChartsIncome";
import style from './Home.module.css'
import NavBar from "../../components/NavBar/NavBar";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from '../../redux/actions';
// import FinanceSummary from "../../components/FinanceSummary/FinanceSummary";

const Home = () => {

    return(
        <div className={style.homeContainer}>
            <NavBar/>
            <h1>Home</h1>
            <div className={style.formSection}>
                <ExpenseForm/>
                <IncomeForm/>
            </div>
            {/* <FinanceSummary/> */}
            <div className={style.chartSection}>
                <PieChartsExpense/>
                <PieChartsIncome/>
            </div>
        </div>
    )
};

export default Home;