import { useDispatch } from "react-redux";
import { reset } from "../store/features/read-limit/readLimitSlice";
import { useState } from "react";

const PayWallContent = ({onClose}) => {
  const dispatch = useDispatch();

  const [isChoosePackage, setIsChoosePackage] = useState(false);

  const doSubscribe = () => {
    dispatch(reset());
    setTimeout(() => {
      onClose && onClose();
    }, 100);
  }

  const choosePackage = () => {
    setIsChoosePackage(prev => !prev);
  }

  return (
    <div className="dialog">
      <div className="body container p-3 rounded-3 bg-light">
        <h3 className="text-center">Buy Package?</h3>
        <p className="text-center">This is a premium content. Subscribe to read the full story.</p>
        <div className="d-flex justify-content-center my-4 gap-4">
          <div className={`card shadow-lg ${isChoosePackage ? 'border border-primary' : ''}`} style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title text-center">Package 1</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button type="button" onClick={() => choosePackage()} className="btn btn-primary w-100">Choose</button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2">
          <button type="button" className="btn btn-primary min-120px" disabled={!isChoosePackage}  onClick={() => doSubscribe()}>Subscribe</button>
          <button type="button" className="btn btn-danger min-120px"  onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PayWallContent;