import ActionsMetrics from "../../components/ActionsMetrics/ActionsMetrics";
import IncomeExpenseLog from "../../components/IncomeExpenseLog/IncomeExpenseLog"
import NavBar from "../../components/NavBar/NavBar";



const IncomeExpenseView = () => {

    return(
        <div>
            <NavBar/>
            <IncomeExpenseLog />
            <ActionsMetrics />
        </div>
    )
}

export default IncomeExpenseView;