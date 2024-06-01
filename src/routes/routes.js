import App from '../App';
import DetailPost from '../pages/DetailPost';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/Error';


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/post/:id',
    element: <DetailPost />,
    errorElement: <ErrorPage />,
  },
]);

export default Routes;