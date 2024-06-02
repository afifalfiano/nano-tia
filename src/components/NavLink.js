import useNavigateWithTransition from "../hooks/useNavigateWithTransitions";

const NavLink = ({children, to}) => {
  const {goToPath, location} = useNavigateWithTransition()
  const {pathname} = location;
  const goTo = (ev) => {
      ev.preventDefault();
      goToPath(to);
  }
  
  return (
      <li className="nav-item">
        <a className={`nav-link ${pathname === to && 'active'}`} href={to} onClick={(ev) => goTo(ev)}>
        {children}
        </a>
      </li>

  )
}


export default NavLink;