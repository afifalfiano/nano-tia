import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom"


const useNavigateWithTransition = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToPath = (to) => {
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(to);
      });
    });

    navigate()
  }


  return {
    goToPath,
    location
  }
}


export default useNavigateWithTransition;