// import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import style from "./MobileNavBar.module.css"
import clean from "../../assets/clean.png"



const NavBar = ({onClick}) =>{
  
    const navigate = useNavigate();

    const onPress = (value) => {
      onClick();
      navigate(value);
    };

    return (
        <div className={style.navContainer}>
            <div className={style.text}>
                <img src={clean} className={style.imgContainer} onClick={onClick}/>
                <p onClick={() => onPress("/home")} className={style.navItem}>Home</p>
                <p onClick={() => onPress("/collaboration")} className={style.navItem} >Donar</p>
                <p onClick={() => onPress("/detailsLog")} className={style.navItem} >Movimientos</p>
                <p onClick={() => onPress("/users")} className={style.navItem}>Usuarios</p>
            </div>
        </div>
    )
}

export default NavBar;