import { useSelector } from "react-redux";
import { selectFavoritArticles } from "../store/features/favorit-articles/favoritArticlesSlice";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNavigateWithTransition from "../hooks/useNavigateWithTransitions";

const Navbar = () => {
  const {articles} = useSelector(selectFavoritArticles);
  const [isExpand, setIsExpand] = useState(false);
  const navigate = useNavigate();
  const {goToPath} = useNavigateWithTransition()

  const showExpand = () => {
    setIsExpand(prev => !prev);
  }
  
  const goTo = (ev) => {
      ev.preventDefault();
      goToPath('/');
  }

  useEffect(() => {
    setIsExpand(false);
  }, [navigate])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand text-light text-bold" href={'#'} onClick={(ev) => goTo(ev)}>
        Nano TIA  
      </a>
      <button className={`navbar-toggler ${!isExpand && 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" onClick={() => showExpand()}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isExpand && 'show'}`} id="navbarNavDropdown">
        <ul className="navbar-nav">
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/favorit-articles'}>
              Favorit Articles
              {articles.length > 0 && (
                <span className="badge bg-info text-dark ms-2">{articles.length}</span>
              )}
          </NavLink>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;