

const PayWallContent = ({onClose}) => {

  return (
    <div className="dialog">
      <div className="body">
        <h1>I'm a pay wall</h1>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default PayWallContent;