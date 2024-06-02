import { useSelector } from "react-redux";
import { selectReadLimit } from "../store/features/read-limit/readLimitSlice";
import PayWallContent from "./PayWallContent";
import { createPortal } from "react-dom";
import { useState } from "react";

const TotalReadLimit = () => {
  const {total} = useSelector(selectReadLimit);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="fixed-bottom">
      <div className="navbar navbar-dark bg-danger">
        <div className="container-fluid text-center">
          <div className="m-0 text-light fw-bold w-100">
            <span className="mx-2">Total Limit: {total}/5</span>
            <button type="button" className="d-inline btn btn-sm btn-secondary" onClick={() => setShowModal(true)}>Subscribe Now!</button>
          </div> 
        </div>
      </div>
    </div>

    {showModal && createPortal(
      <PayWallContent onClose={() => setShowModal(false)} />,
      document.body
    )}
    </>
  )
}

export default TotalReadLimit;