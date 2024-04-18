import { useEffect, useState } from "react";
import { Button} from 'react-bootstrap';
import { useStateGlobal } from "../../zustand/stateGlobal";
import TableReview from "./tables/TableReview";
import style from './Review.module.css'
import LoopIcon from '@mui/icons-material/Loop';
import { useCategoriesStore } from "../../store/categories";

const Review = ()=> {
  const [actions, setActions] = useState("todos");

  //lectura estado global
   const review = useCategoriesStore(state => state.review)
   const reviewUnlock = useCategoriesStore(state => state.reviewUnlock)
   const error = useCategoriesStore(state => state.error)
   //funciones
   const getReview = useCategoriesStore(state => state.getReview);
   const getReviewUnlock = useCategoriesStore(state => state.getReviewUnlock);
   const unlockReview = useCategoriesStore(state => state.unlockReview);
   const restore = useCategoriesStore(state => state.restore);
   const deleteReviewComponent = useCategoriesStore(state => state.delete);
   const deleteMessageError = useCategoriesStore(state => state.deleteMessage);

   useEffect(()=> {
    getReview()
    getReviewUnlock()

   }, [])

   useEffect(()=>{
    setTimeout(()=>{
      deleteMessageError()
    }, 3000)  
   }, [error])

   console.log(review);

    return (
        <div className="container">  
          <div className={style.subContainer}>
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
            {error && <h1>{error}</h1>}
            {
              actions === "todos" ? (<TableReview  review={review} functionUnlock={unlockReview} functionDelete={deleteReviewComponent} variantDanger="danger"/>) : (<TableReview review={reviewUnlock} functionUnlock={restore} functionDelete={deleteReviewComponent} variantSuccess="danger" variantDanger="danger"/>)
            }
           

             
        </div>
    )
}

export default Review;