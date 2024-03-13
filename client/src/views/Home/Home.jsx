import ExpenseForm from "../../components/Expense/ExpenseForm";
import IncomeForm from "../../components/Income/IncomeForm";

const Home = () => {
    return(
        <div>
            <h1>Vista para home</h1>
            <ExpenseForm/>
            <IncomeForm/>
        </div>
    )
};

export default Home;