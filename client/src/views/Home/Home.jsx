<<<<<<< HEAD
// import ExpenseForm from "../../components/Expense/ExpenseForm";
import IncomeForm from "../../components/Income/IncomeForm";
//import PieChartsExpense from "../../components/Charts/PieChartsExpense";
//import PieChartsIncome from "../../components/Charts/PieChartsIncome";
import style from './Home.module.css'
import NavBar from "../../components/NavBar/NavBar";
// import ExpenseIncomeForm from "../../components/ExpenseIncome/ExpenseIncomeForm";
import ExpenseForm from "../../components/Expense/ExpenseForm";
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
            {/* <div className={style.chartSection}>
                <PieChartsExpense/>
                <PieChartsIncome/>
            </div> */}
=======
import 'bootstrap/dist/css/bootstrap.min.css'; 
import NavBar from "../../components/NavBar/NavBar";
import ExpenseForm from "../../components/Expense/ExpenseForm";
import IncomeForm from "../../components/Income/IncomeForm";
import style from './Home.module.css';

const Home = () => {
    return (
        <div className={style.homeContainer}>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-4">
                        <ExpenseForm />
                    </div>
                    <div className="col-md-4">
                        <IncomeForm />
                    </div>
                </div>
            </div>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        </div>
    )
};

export default Home;
