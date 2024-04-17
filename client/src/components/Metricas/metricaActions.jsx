import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import './metricasActions.css'; 

const MetricasActions = ({ title, number }) => {
    const navigate = useNavigate();

    return (
        <div className="metricas-container justify-content-center">
            <div className="metricas-item">
                <Table striped>
                    <thead>
                        <tr>
                            {title.map((t, index) => <th key={index}>{t}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {number.map((n, index) => {
                                console.log(n);
                            return <td key={index}>{n}</td>})}
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="metricas-item">
                <Button variant="primary" className="metricas-button" onClick={() => navigate('/detailsLog')}>
                    Ver más detalles
                </Button>
            </div>
        </div>
    )
}

export default MetricasActions;
