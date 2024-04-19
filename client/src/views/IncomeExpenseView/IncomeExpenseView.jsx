import ActionsMetrics from "../../components/ActionsMetrics/ActionsMetrics";
import IncomeExpenseLog from "../../components/IncomeExpenseLog/IncomeExpenseLog"
import NavBar from "../../components/NavBar/NavBar";
// import InfoPDF from "../../components/MenuPDF/InfoPDF";



const IncomeExpenseView = () => {

    return(
        <div>
            <NavBar/>
            <div className="content-container" style={{ position: 'relative', top: '90px' }}>
            <IncomeExpenseLog />
            {/* <InfoPDF /> */}
            <ActionsMetrics />
            </div>
        </div>
    )
}

export default IncomeExpenseView;