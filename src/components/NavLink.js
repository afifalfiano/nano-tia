import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

const NavLink = ({children, to}) => {

  const navigate = useNavigate();
  const goTo = (ev) => {
      ev.preventDefault();
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(to);
        });
      });
  }
  
  return (
    <nav>
      <a
      href={to}
      onClick={(ev) => goTo(ev) }
    >
      <ul>
        <li>
        {children}
        </li>
      </ul>
    </a>
    </nav>
  )
}


export default NavLink;