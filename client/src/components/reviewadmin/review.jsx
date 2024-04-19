import { useEffect, useState } from "react";
import { Button} from 'react-bootstrap';
import TableReview from "./tables/TableReview";
import style from './Review.module.css'
import LoopIcon from '@mui/icons-material/Loop';
import { useCategoriesStore } from "../../store/categories";
import Alert from '@mui/material/Alert';

const Review = ()=> {
  const [actions, setActions] = useState("todos");

  //lectura estado global
   const review = useCategoriesStore(state => state.review)
   const reviewUnlock = useCategoriesStore(state => state.reviewUnlock)
   const error = useCategoriesStore(state => state.error)
   const message = useCategoriesStore(state => state.message)
   //funciones
   const getReview = useCategoriesStore(state => state.getReview);
   const getReviewUnlock = useCategoriesStore(state => state.getReviewUnlock);
   const unlockReview = useCategoriesStore(state => state.unlockReview);
   const restore = useCategoriesStore(state => state.restore);
   const deleteReviewComponent = useCategoriesStore(state => state.delete);
   const deleteMessageError = useCategoriesStore(state => state.deleteMessageError);
   const deleteMessage = useCategoriesStore(state => state.deleteMessage);

   useEffect(()=> {
    getReview()
    getReviewUnlock()

   }, [])

   useEffect(()=>{
    if(error !== null) {
      getReview()
      getReviewUnlock()

      setTimeout(()=>{
        deleteMessageError()
      }, 3000)  
    }

    if(message !== null) {
      getReview()
      getReviewUnlock()

      setTimeout(()=>{
        deleteMessage()
      }, 3000) 
    }
   
   }, [error, message])

   console.log(reviewUnlock);

    return (
        <div className="container">  
          <div className={style.subContainer}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            
            <Button variant="secondary" className={style.btn} onClick={()=> setActions("todos")}>Activos</Button>

            <Button variant="secondary" className={`${style.btn} ${style.btnUnlock}`} onClick={()=> {
              setActions("bloqueados");
              getReviewUnlock()
              }}>
                Bloqueados
                {reviewUnlock.length >= 1 ? <span>{reviewUnlock.length}</span> : ""}
              </Button>

            <Button variant="secondary" className={style.btn} onClick={()=>{
              getReview();
              getReviewUnlock()
            }
            }><LoopIcon /></Button>
            
          </div>
            {
              actions === "todos" ? (<TableReview  review={review} functionUnlock={unlockReview} functionDelete={deleteReviewComponent} variantDanger="danger" message="Bloquear"/>) : (<TableReview review={reviewUnlock} functionUnlock={restore} functionDelete={deleteReviewComponent} variantSuccess="danger" variantDanger="danger" message="Restaurar"/>)
            }
           

             
        </div>
    )
}

export default Review;