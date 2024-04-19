import { Table, Button} from 'react-bootstrap';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TableReview = ({review, functionUnlock, functionDelete, variantSuccess = "success", variantDanger = "success", message})=> {

    return (
        <>
        {review.length > 0 ? (
            <Table striped hover variant="secondary">
                <thead>
                    <tr>
                        <th>ID usuario</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Comentario</th>
                        <th>Puntuación</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {review.map(rev => (
                        <tr key={rev.id}>
                            
                            <td>{rev.user && rev.user.id}</td>
                            <td>{rev.user && rev.user.name}</td>
                            <td>{rev.user && rev.user.email}</td>
                            <td>{rev.comment}</td>
                            <td>{rev.ranking}</td>
                            {/* BOTONES */}
                            <td>
                              <Button variant={variantSuccess} onClick={()=> functionUnlock(rev.id)}>
                                {message}
                                <SpeakerNotesOffIcon/>
                              </Button>
                            </td>
                            {/* BOTONES */}
                            <td>
                              <Button variant={variantDanger} onClick={()=> functionDelete(rev.id)}>
                                Eliminar
                                <DeleteForeverIcon/>
                              </Button>
                            </td>
                        </tr>)
                    )}
                </tbody>
            </Table>
        ) : (
        <h3>No hay comentarios</h3>)}
        </>
    )
}

export default TableReview;