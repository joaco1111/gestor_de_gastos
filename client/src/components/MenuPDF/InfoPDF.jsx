import React, {useRef} from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import {useReactToPrint} from "react-to-print"





function InfoPDF () {

  const componentPDF= useRef()
  const actions = useSelector(state => state.actions);

  const generatePDF = useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle: "ReporteGDG",
    onAfterPrint: ()=>alert("Data save in PDF")

  });


  return (
    <div className='container'>
      
        <div className='col-sm-12 col-md-12 col-lg-12 my-3' style={{ paddingTop: '20px' }}>
           <div ref={componentPDF} style={{width:'100%'}}>
            <Table striped bordered hover> {/* Utilizar componente de tabla de Bootstrap */}
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                {actions.map(action => (
                  <tr key={action.id}>
                    <td>{action.type}</td>
                    <td>{action.date}</td>
                    <td>{action.quantity}</td>
                    <td>{action.categoryBill ? action.categoryBill.name : ''} {action.categoryIncome ? action.categoryIncome.name : ''}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
           </div>
        </div>
        <button onClick={generatePDF}>PDF</button>
    
    </div>
  );
};

export default InfoPDF;