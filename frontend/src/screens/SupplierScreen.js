import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsSupplier, saveSupplierReview } from '../actions/supplierActions';

/**
   * New supplier insertion screen
   * 
   * 
   * @author 2020-JUN-WE-05
   * @version 1.0
   * @param {*} props 
   * 
*/

function SupplierScreen(props) {
  const [qty, setQty] = useState(1);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const supplierDetails = useSelector((state) => state.supplierDetails);
  const { supplier, loading, error } = supplierDetails;
  const { success: supplierSaveSuccess } = supplierReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (supplierSaveSuccess) {
      alert('Review submitted successfully.');
    }
    dispatch(detailsSupplier(props.match.params.id));
    return () => {
      //
    };
  }, [supplierSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={supplier.image} alt="supplier"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{supplier.name}</h4>
                </li>
                <li>
                  Email: <b>${supplier.email}</b>
                </li>
                <li>
                  Location:
                  <div>{supplier.location}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Email: {supplier.email}</li>
                <li>
                  Status:{' '}
                  {supplier.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(supplier.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {supplier.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Order
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <ul className="review" id="reviews">
              <li>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                    </ul>
                  </form>
                ) : (
                  <div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default SupplierScreen;
