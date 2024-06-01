import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to={`/post/${Math.floor(Math.random() * 10) + 1}`}>Detail Sample</Link></li>
      </ul>
    </nav>
  )
}


export default Nav;