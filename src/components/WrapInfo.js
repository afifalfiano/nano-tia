import { useSelector } from "react-redux"
import { selectReadLimit } from "../store/features/read-limit/readLimitSlice"
import { selectFavoritArticles } from "../store/features/favorit-articles/favoritArticlesSlice";
import { useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import { flushSync } from "react-dom";


const WrapInfo = ({children}) => {
  const {total} = useSelector(selectReadLimit);
  const {articles} = useSelector(selectFavoritArticles);
  const navigate = useNavigate();

  const goToFavoritPage = () => {
    document.startViewTransition(() => {
      flushSync(() => {
        navigate('/favorit-articles');
      });
    });
  }
  return (
    <div>
      <div className="total-favorit">
        Favorit: {articles?.length || 0} | &nbsp; 
        <span onClick={() => goToFavoritPage()}>Go to Favorit Page</span>
      </div>
      <div className="wrap-nav">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/favorit-articles'}>Favorit Articles</NavLink>
      </div>
      {children}
      <div className="total-limit-read">
        Total Limit: {total} 
      </div>
    </div>
  )
}

export default WrapInfo;