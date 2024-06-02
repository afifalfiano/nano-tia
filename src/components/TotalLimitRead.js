import { useSelector } from "react-redux"
import { selectReadLimit } from "../store/features/read-limit/readLimitSlice"


const TotalLimitRead = ({children}) => {
  const {total} = useSelector(selectReadLimit);
  return (
    <div>
      {children}
      <div className="total-limit-read">
        Total Limit: {total} 
      </div>
    </div>
  )
}

export default TotalLimitRead;