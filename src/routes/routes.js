import App from '../App';
import DetailPost from '../pages/DetailPost';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/Error';
import { WrapInfo } from '../components';
import FavoritArticlesPage from '../pages/FavoritArticlesPage';


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <WrapInfo><App /></WrapInfo>,
    errorElement: <WrapInfo><ErrorPage /></WrapInfo>,
  },
  {
    path: '/post/:slug',
    element: <WrapInfo><DetailPost /></WrapInfo>,
    errorElement: <WrapInfo><ErrorPage /></WrapInfo>,
  },
  {
    path: '/favorit-articles',
    element: <WrapInfo><FavoritArticlesPage/></WrapInfo>,
    errorElement: <WrapInfo><ErrorPage /></WrapInfo>,
  }
]);

export default Routes;