import Navbar from "./Navbar";
import TotalReadLimit from "./TotalReadLimit";

const WrapInfo = ({children}) => {

  return (
    <div>
      <Navbar />
      {children}
      <TotalReadLimit />
    </div>
  )
}

export default WrapInfo;