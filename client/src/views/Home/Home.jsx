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
        </div>
    )
};

export default Home;
