import { useSelector } from "react-redux";
import { selectFavoritArticles } from "../store/features/favorit-articles/favoritArticlesSlice";
import NavLink from "./NavLink";

const Navbar = () => {
  const {articles} = useSelector(selectFavoritArticles);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Nano TIA</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
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