import { NavLink } from "react-router-dom"
import style from "./NavBar.module.css"
import MobileNavBar from "./MobileNavBar"
import { useState, useEffect } from "react"
import Hamburger from "../../assets/hamburger.png"
import nav from "../../assets/nav.png"



const NavBar = () =>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //*Me almacena las dimensiones de la ventana
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
    //*Manejo los cambios de tamaño d la ventana
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      useEffect(() => {
        //Dimensiones iniciales de la ventana
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
    
        //Actualiza las dimensiones al cambiar el tamaño de la ventana
        window.addEventListener("resize", handleResize);
    
        //limpia cuando se desmonta
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []); 
    
      
      const { width, height } = windowDimensions;
  
      const isSizeLow = width < 800;

    return (
        <div className={style.navContainer}>

               <NavLink to='/'>
                <img className={style.logo} src={nav} alt="" />
              </NavLink> 
          
        
            {
                !isSizeLow ? 
                <div className={style.text}>
                  <NavLink to="/home" className={style.navItem}>Home</NavLink>
                  <NavLink to="/collaboration"className={style.navItem} >Donar</NavLink>
                </div>
            :
                <img className={style.image} src={Hamburger} onClick={() => setIsMenuOpen(true)}/>
            }
            {
              //Si el menu esta abierto renderizo el mobile NavBar
                isMenuOpen && (<MobileNavBar onClick={() => setIsMenuOpen(false)}/>)
            }
        </div>
    )
}

export default NavBar;