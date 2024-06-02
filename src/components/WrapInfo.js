import { useSelector } from "react-redux"
import { selectReadLimit } from "../store/features/read-limit/readLimitSlice"
import { selectFavoritArticles } from "../store/features/favorit-articles/favoritArticlesSlice";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";


const WrapInfo = ({children}) => {
  const {total} = useSelector(selectReadLimit);
  const {articles} = useSelector(selectFavoritArticles);
  const navigate = useNavigate();

  const goToFavoritPage = () => {
    navigate('/favorit-articles');
  }
  return (
    <div>
      <div className="total-favorit">
        Favorit: {articles?.length || 0} | &nbsp; 
        <span onClick={() => goToFavoritPage()}>Go to Favorit Page</span>
      </div>
      <div className="wrap-nav">
        <Nav />
      </div>
      {children}
      <div className="total-limit-read">
        Total Limit: {total} 
      </div>
    </div>
  )
}

export default WrapInfo;