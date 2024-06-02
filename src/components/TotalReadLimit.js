import { useSelector } from "react-redux";
import { selectReadLimit } from "../store/features/read-limit/readLimitSlice";

const TotalReadLimit = () => {
  const {total} = useSelector(selectReadLimit);

  return (
    <div className="fixed-bottom">
      <div className="navbar navbar-dark bg-danger">
        <div className="container-fluid text-center">
          <p className="m-0 text-light w-100 fw-bold">Total Limit: {total}/5</p>
        </div>
      </div>
    </div>
  )
}

export default TotalReadLimit;