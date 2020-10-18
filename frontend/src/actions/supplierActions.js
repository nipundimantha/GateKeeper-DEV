import {
    SUPPLIER_LIST_REQUEST,
    SUPPLIER_LIST_SUCCESS,
    SUPPLIER_LIST_FAIL,
    SUPPLIER_DETAILS_REQUEST,
    SUPPLIER_DETAILS_SUCCESS,
    SUPPLIER_DETAILS_FAIL,
    SUPPLIER_SAVE_REQUEST,
    SUPPLIER_SAVE_SUCCESS,
    SUPPLIER_SAVE_FAIL,
    SUPPLIER_DELETE_SUCCESS,
    SUPPLIER_DELETE_FAIL,
    SUPPLIER_DELETE_REQUEST,
    SUPPLIER_REVIEW_SAVE_REQUEST,
    SUPPLIER_REVIEW_SAVE_FAIL,
    SUPPLIER_REVIEW_SAVE_SUCCESS,
  } from '../constants/supplierConstants';
  import axios from 'axios';
  import Axios from 'axios';
  
  const listSuppliers = (
    category = '',
    searchKeyword = '',
    sortOrder = ''
  ) => async (dispatch) => {
    try {
      dispatch({ type: SUPPLIER_LIST_REQUEST });
      const { data } = await axios.get(
        '/api/suppliers?category=' +
          category +
          '&searchKeyword=' +
          searchKeyword +
          '&sortOrder=' +
          sortOrder
      );
      dispatch({ type: SUPPLIER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SUPPLIER_LIST_FAIL, payload: error.message });
    }
  };
  
  const saveSupplier = (supplier) => async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPLIER_SAVE_REQUEST, payload: supplier });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!supplier._id) {
        const { data } = await Axios.post('/api/suppliers', supplier, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: SUPPLIER_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await Axios.put(
          '/api/suppliers/' + supplier._id,
          supplier,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: SUPPLIER_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: SUPPLIER_SAVE_FAIL, payload: error.message });
    }
  };
  
  const detailsSupplier = (supplierId) => async (dispatch) => {
    try {
      dispatch({ type: SUPPLIER_DETAILS_REQUEST, payload: supplierId });
      const { data } = await axios.get('/api/suppliers/' + supplierId);
      dispatch({ type: SUPPLIER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SUPPLIER_DETAILS_FAIL, payload: error.message });
    }
  };
  
  const deleteSupplier = (supplierId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: SUPPLIER_DELETE_REQUEST, payload: supplierId });
      const { data } = await axios.delete('/api/suppliers/' + supplierId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: SUPPLIER_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: SUPPLIER_DELETE_FAIL, payload: error.message });
    }
  };
  
  const saveSupplierReview = (supplierId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: SUPPLIER_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post(
        `/api/suppliers/${supplierId}/reviews`,
        review,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: SUPPLIER_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: SUPPLIER_REVIEW_SAVE_FAIL, payload: error.message });
    }
  };
  
  export {
    listSuppliers,
    detailsSupplier,
    saveSupplier,
    deleteSupplier,
    saveSupplierReview,
  };
  