import ActionsMetrics from "../../components/ActionsMetrics/ActionsMetrics";
import IncomeExpenseLog from "../../components/IncomeExpenseLog/IncomeExpenseLog"
import NavBar from "../../components/NavBar/NavBar";
// import InfoPDF from "../../components/MenuPDF/InfoPDF";



const IncomeExpenseView = () => {

    return(
        <div>
            <NavBar/>
            <IncomeExpenseLog />
            {/* <InfoPDF /> */}
            <ActionsMetrics />
        </div>
    )
}

export default IncomeExpenseView;