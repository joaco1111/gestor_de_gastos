import Table  from "react-bootstrap/Table";
import Button  from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const MetricasActions = ({title, number}) => {

    const navigate = useNavigate();

    return (
        <>
            <Table striped>
                <thead >
                    <tr>
                        {title.map(t => {
                            return <th>{t}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                        {number.map(n => {
                            return <td>{n}</td>
                        })}
                    </tr>
                </tbody>
            </Table>
            <Button variant="info" onClick={()=> navigate('/detailsLog')}> 
                Ver más detalles
            </Button>
        </>
    )
}

export default MetricasActions;