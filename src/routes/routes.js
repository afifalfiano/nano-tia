import App from '../App';
import DetailPost from '../pages/DetailPost';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/Error';
import { TotalLimitRead } from '../components';


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <TotalLimitRead><App /></TotalLimitRead>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/post/:slug',
    element: <TotalLimitRead><DetailPost /></TotalLimitRead>,
    errorElement: <ErrorPage />,
  },
]);

export default Routes;